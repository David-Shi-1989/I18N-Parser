import React from 'react'
import {read} from 'xlsx'
import './excel-upload.scss'
import { Button } from 'antd'
import UploadIcon from '../../../assets/svg/upload'
import ExcelIcon from '../../../assets/svg/excel'
import RemoveIcon from '../../../assets/svg/remove'
import SuccessIcon from '../../../assets/svg/success-check'
import FailIcon from '../../../assets/svg/fail-cross'
import {fileSize} from '../../../utils'
import { connect } from 'react-redux'
import {mapStateToProps, mapDispatchToProps} from './state.map'

const upload_status = {
  wait: 'wait',
  success: 'success',
  fail: 'fail'
}

const color = {
  success: '#52c41a',
  fail: '#ff4d4f',
  wait: '#878787'
}

class ExcelUpload extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      files: []
    }
  }
  onUploadChange (evt) {
    let files = evt.target.files
    for (let i = 0; i < files.length; i++) {
      files[i].status = upload_status.wait
    }
    this.props.setFiles(files)
    this.setState({files})
    this.props.onFileChange(files.length)
  }
  readFile (file) {
    var reader = new FileReader();
    reader.readAsBinaryString(file);
    let me = this;
    return new Promise((resolve, reject) => {
      try {
        reader.onload = function(evt) {
          var data = evt.target.result;
          var workbook = read(data, {type: 'binary'});
          resolve(me.formatSheetData(file.name, workbook))
        }
      } catch (err) {
        reject(err)
      }
    })
  }
  formatSheetData (fileName, excelObj) {
    let obj = {}
    for (let sheetIdx = 0; sheetIdx < excelObj.SheetNames.length; sheetIdx++) {
      let sheetName = excelObj.SheetNames[sheetIdx]
      console.assert(excelObj.Sheets[sheetName], `can not find sheet ${sheetName} in ${fileName}`)
      let cells = Object.keys(excelObj.Sheets[sheetName]).filter(key => /^[a-z]+\d+$/i.test(key))
      for (let i = 0; i < cells.length; i++) {
        let cellKey = cells[i];
        const rowIdx = cellKey.replace(/\d+/, '').toUpperCase(), colIdx = parseInt(cellKey.replace(/[a-z]+/i, '')) - 1;
        if (!obj[rowIdx]) {
          obj[rowIdx] = []
        }
        obj[rowIdx][colIdx] = excelObj.Sheets[sheetName][cellKey].v
      }
    }
    console.assert(obj.A[1] === 'EN')
    let list = []
    Object.keys(obj).forEach(rowKey => {
      let row = obj[rowKey], shortLang = obj[rowKey][1];
      for (let colIdx = 2; colIdx < row.length; colIdx++) {
        let matchWording = list.find(i => i.index === colIdx)
        if (!matchWording) {
          matchWording = {index: colIdx}
          list.push(matchWording)
        }
        matchWording[shortLang] = row[colIdx]
      }
    })
    return list.map(i => {
      delete i.index
      return i
    });
  }
  // event
  onWaitContainerClick () {
    this.uploadInput.click()
  }
  waitUploadRender () {
    return (
      <div className='wait-upload' onClick={this.onWaitContainerClick.bind(this)}>
        <div>
          <UploadIcon size={42} fill="#888"/>
          <p>Upload excel file.</p>
        </div>
        <input ref={input => this.uploadInput = input} type="file" onChange={this.onUploadChange.bind(this)}/>
      </div>
    )
  }
  fileListRender () {
    let fileNode = []
    for (let i = 0; i < this.state.files.length; i++) {
      let file = this.state.files[i]
      let statusColor = color[file.status]
      let statusIcon =  <Button type="text"><RemoveIcon size={19} fill={statusColor}/></Button>
      if (file.status === upload_status.success) {
        statusIcon = <SuccessIcon size={20} fill={statusColor}/>
      } else if (file.status === upload_status.fail) {
        statusIcon = <FailIcon size={22} fill={statusColor}/>
      }
      fileNode.push((
        <li data-status={file.status} key={i}>
          <span className='icon' style={{backgroundColor: statusColor}}><ExcelIcon size={32} fill="#fff"/></span>
          <div>
            <p className='file-name'>{file.name}</p>
            <p className='file-size'>{fileSize(file.size)}</p>
          </div>
          <div className='status'>
            {statusIcon}
          </div>
        </li>
      ))
    }
    return (
      <ul className='file-list'>
        {fileNode}
      </ul>
    )
  }
  async parseFiles () {
    const result = []
    for (let i = 0; i < this.state.files.length; i++) {
      let file = this.state.files[i]
      let content = await this.readFile(file)
      result.push(...content)
    }
    return Promise.resolve(result)
  }
  render () {
    let container = this.state.files.length > 0 ? this.fileListRender() : this.waitUploadRender()
    return (
      <div className='excel-upload-container'>
        {container}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps, null, {forwardRef: true})(ExcelUpload)
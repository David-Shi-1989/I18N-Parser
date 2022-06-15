import React from 'react'
import { Table, Input, Switch, message } from 'antd';
import {LangList} from '../../../utils'
import './step2-table.scss'
import SuccessCheckSvg from '../../../assets/svg/success-check';
import FailCrossSvg from '../../../assets/svg/fail-cross';
import CopySvg from '../../../assets/svg/copy'
import {get, debounce} from 'lodash'
import {encodeUnicode, copyTo} from '../../../utils'

function checkI18NKey (key) {
  if (key === '') {
    return 'warning'
  } else if (/^[a-z0-9._]+$/i.test(key)) {
    return 'success'
  } else {
    return 'error'
  }
}

export default class DataTable extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      toolbar: {
        isEncode: true
      },
      columns: [
        {
          title: 'Index',
          key: 'index',
          width: 80,
          render: (record) => {
            return <span>{record.key}</span>
          }
        },
        {
          title: 'Key',
          render: ({key, i18nKey}) => {
            let me = this
            return <Input size="small" defaultValue={i18nKey} status={this.state.formatDataSource[key - 1].i18nKeyValid} onChange={evt => {
              let value = evt.target.value
              me.updateRowI18NKey(key, value)
            }}/>
          },
          width: 400,
        },
        {
          title: 'EN',
          dataIndex: 'EN',
          key: 'EN',
          ellipsis: true,
        },
        {
          title: 'Valid',
          render: (record) => {
            const size = 16
            return <span>{record.isValid ? <SuccessCheckSvg size={size}/> : <FailCrossSvg size={size}/>}</span>
          },
          width: 120,
        },
      ],
      formatDataSource: [],
    }
  }
  updateRowI18NKey = debounce(function (index, key) {
    let formatDataSource = this.state.formatDataSource
    formatDataSource[index - 1].i18nKey = key
    formatDataSource[index - 1].i18nKeyValid = checkI18NKey(key)
    this.setState({formatDataSource})
    this.props.onChange(formatDataSource)
  }, 1000)
  formatData () {
    let me = this
    return this.props.dataSource.map((row, idx) => {
      let newRow = Object.assign({}, row)
      newRow.key = (idx + 1)
      let langCount = Object.keys(newRow).filter(key => !!newRow[key] && LangList.some(l => l.flag.includes(key.toLowerCase()))).length
      newRow.isValid = langCount === LangList.length
      newRow.i18nKey = get(newRow, 'i18nKey', '')
      newRow.i18nKeyValid = checkI18NKey(newRow.i18nKey)
      if (me.state.toolbar.isEncode) {
        Object.keys(newRow).forEach(key => {
          if (typeof newRow[key] === 'string') {
            newRow[key] = encodeUnicode(newRow[key])
          }
        })
      }
      return newRow
    })
  }
  pagination () {
    return {
      total: this.props.dataSource.length,
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `Total ${total} items`
    }
  }
  initKeyArray () {
    var formatDataSource = this.formatData()
    this.setState({formatDataSource})
  }
  componentWillMount () {
    this.initKeyArray()
  }
  isEncodeChange () {
    let toolBar = this.state.toolbar
    toolBar.isEncode = !toolBar.isEncode
    this.setState({toolbar: toolBar})
    this.initKeyArray()
  }
  render () {
    return (
      <div className='wording-table-wrap'>
        <div>
          <div style={{marginBottom: '10px'}}>
            <label style={{marginRight:'10px'}}>IsEncode</label>
            <Switch defaultChecked={this.state.toolbar.isEncode} onChange={this.isEncodeChange.bind(this)}></Switch>
          </div>
        </div>
        <Table style={{style: '500px'}}
          columns={this.state.columns} dataSource={this.state.formatDataSource}
          expandable={{
            expandedRowRender: record => {
              return (
                <ul className='table-wording-list'>
                  {
                    Object.keys(record).filter(key => LangList.some(l => l.flag.includes(key.toLowerCase()))).map(langKey => <li key={langKey}>
                      <i className={'flag-icon ' + langKey.toLowerCase()}></i>
                      <p className='key'>{langKey}</p>
                      <div style={{display:'flex',alignItems:'baseline'}}>
                        <p className='wording'>{record[langKey]}</p>
                        <span style={{cursor: 'pointer',marginLeft: '10px'}} title="copy" onClick={() => {
                          copyTo(record[langKey]);
                          message.success('Copy Success!');
                        }}><CopySvg size={12} fill={'#555'}/></span>
                      </div>
                    </li>)
                  }
                </ul>
              )
            },
            rowExpandable: () => true
          }}
          pagination={this.pagination()} bordered size="small"></Table>
      </div>
    )
  }
}
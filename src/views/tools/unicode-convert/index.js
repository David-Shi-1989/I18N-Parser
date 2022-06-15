import React from 'react'
import { Input, Button, message } from 'antd'
import './style.scss'
import {encodeUnicode, decodeUnicode, copyTo} from '../../../utils'
import ToolBar from './tool-bar'

const {TextArea} = Input
class UnicodeConvert extends React.Component {
  constructor () {
    super()
    this.state = {
      beforeWording: '',
      afterWording: ''
    };
    this.onBeforeWordingChange = this.onBeforeWordingChange.bind(this)
    this.onAfterWordingChange = this.onAfterWordingChange.bind(this)
    this.onEncodeBtnClick = this.onEncode.bind(this)
    this.onDecodeBtnClick = this.onDecode.bind(this)
  }
  onBeforeWordingChange (evt) {
    this.setState({beforeWording: evt.currentTarget.value})
  }
  onAfterWordingChange (evt) {
    this.setState({afterWording: evt.currentTarget.value})
  }
  onEncode () {
    this.setState({afterWording: encodeUnicode(this.state.beforeWording)})
  }
  onDecode () {
    this.setState({beforeWording: decodeUnicode(this.state.afterWording)})
  }
  onToolbarClick (type) {
    switch (type) {
      case 'clear':
        this.doClear()
        break
      case 'copy':
        this.doCopy()
        break
      default:
        console.log('unrecognized type', type)
    }
  }
  doClear () {
    this.setState({beforeWording: '', afterWording: ''})
  }
  doCopy () {
    if (this.state.afterWording) {
      copyTo(this.state.afterWording)
      message.success('Copy Success!')
    } else {
      message.warning('No wording after convert.')
    }
  }
  render () {
    return (
      <div>
        <h3>Unicode Convert</h3>
        <ToolBar onToolbarClick={this.onToolbarClick.bind(this)}/>
        <TextArea value={this.state.beforeWording} row={6}
          className="convert-input" placeholder="Wording before convert"
          style={{marginBottom: '20px'}}
          onChange={this.onBeforeWordingChange}/>
        <br/>
        <div className='d-flex'>
          <Button type='primary' onClick={this.onEncodeBtnClick} disabled={!this.state.beforeWording} size="small">
            Encode &#8595;
          </Button>
          <Button type='primary' onClick={this.onDecodeBtnClick} disabled={!this.state.afterWording} size="small" style={{marginLeft: '20px'}}>
            Decode &#8593;
          </Button>
        </div>
        <br/>
        <TextArea value={this.state.afterWording} row={6}
        className="convert-input" placeholder="Wording after convert"
        onChange={this.onAfterWordingChange}/>
      </div>
    )
  }
}

export default UnicodeConvert
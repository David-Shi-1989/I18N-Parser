import React from 'react'
import {Steps, Button} from 'antd'
import FileUpload from './excel-upload'
import DataTable from './step2-table'
import GenerateScript from './generate-script'
import { localStorage_key } from './constant'

import './index.scss'
import {get} from 'lodash'

const {Step} = Steps;
const stepCount = 4;

class AutoFetch extends React.Component {
  constructor (props) {
    super(props)
    this.cacheData = this.getCacheData()
    this.state = {
      currentStep: this.initStep(),
      stepReadyState: (new Array(stepCount)).join(',').split(',').map(() => false),
      files: get(this.cacheData, ['step1', 'files'], null),
      data: get(this.cacheData, ['step2', 'data'], [])
    }

  }
  componentWillMount () {
    this.setStepReadyState()
  }
  initStep () {
    let idx = 0
    if (this.cacheData.step2) {
      idx = 2
    } else if (this.cacheData.step1) {
      idx = 1
    }
    return idx
  }
  setStepReadyState (_step, _isReady) {
    let step = typeof _step === 'number' ? _step : this.state.currentStep
    let hasSetReady = typeof _isReady === 'boolean'
    let isReady = hasSetReady ? _isReady : false
    if (!hasSetReady) {
      if (step === 0) {
        let files = get(this.cacheData, ['step1', 'files'], [])
        isReady = files.length > 0
      } else if (step === 1) {
        let data = get(this.cacheData, ['step2', 'data'], [])
        isReady = data.length > 0 && data.every(r => r.i18nKeyValid === 'success')
      }
    }
    let {stepReadyState} = this.state
    stepReadyState[step] = !!isReady
    this.setState({stepReadyState})
  }
  setStep (step) {
    this.setState({currentStep: step})
  }
  // step1
  step1FileChange (fileLength) {
    this.setStepReadyState(this.state.currentStep, fileLength > 0)
  }
  // step2
  step2Change (data) {
    this.cacheData.step2 = {data}
    this.setState({data})
    this.saveCacheData()
    // judge step2 is ready or not
    this.setStepReadyState()
  }
  async onNextBtn () {
    const curStep = this.state.currentStep
    if (curStep === 0) {
      let files = this.step1Upload.state.files
      this.setState({files})
      const data = await this.step1Upload.parseFiles()
      if (data && data.length > 0) {
        this.setState({data})
        this.setStep(this.state.currentStep + 1)
        // save cache
        this.cacheData.step1 = {files}
        this.saveCacheData()
      } else {
        this.setStepReadyState(curStep, false)
      }
    } else if (curStep === 1) {
      // save cache
      this.saveCacheData()
      this.setStep(this.state.currentStep + 1)
    }
  }
  onBackBtn () {
    const backStep = this.state.currentStep - 1
    if (backStep >= 0 && backStep < 3) {
      this.setStep(backStep)
    }
  }
  getCacheData () {
    let obj = {}
    try {
      let text = localStorage.getItem(localStorage_key) || ''
      obj = JSON.parse(text)
    } catch (err) {
      obj = {}
    }
    return obj
  }
  saveCacheData () {
    localStorage.setItem(localStorage_key, JSON.stringify(this.cacheData))
  }
  render () {
    let stepContent = <div>Building</div>
    if (this.state.currentStep === 0) {
      stepContent = <FileUpload ref={node => this.step1Upload = node} onFileChange={this.step1FileChange.bind(this)}/>
    } else if (this.state.currentStep === 1) {
      stepContent = <DataTable dataSource={this.state.data} onChange={this.step2Change.bind(this)}/>
    } else if (this.state.currentStep === 2) {
      stepContent = <GenerateScript></GenerateScript>
    }
    return (
      <div className='tool-auto-fetch-wrap'>
        <h3>I18N Fetch</h3>
        <Steps size="small" current={this.state.currentStep}>
          <Step title="Upload Excel File"></Step>
          <Step title="Confirm Record"></Step>
          <Step title="Generate Script File"></Step>
          <Step title="Run Script in local"></Step>
        </Steps>
        <div className='step-container'>{stepContent}</div>
        <div className='btn-container'>
          <Button type='primary' disabled={!this.state.stepReadyState[this.state.currentStep]} onClick={this.onNextBtn.bind(this)}>Next</Button>
          { this.state.currentStep > 0 && <Button style={{marginLeft: '20px'}} onClick={this.onBackBtn.bind(this)}>Back</Button> }
        </div>
      </div>
    )
  }
}

export default AutoFetch
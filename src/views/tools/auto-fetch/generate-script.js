import React from 'react'
import { connect } from 'react-redux'
import {mapStateToProps, mapDispatchToProps} from './state.map'
import { Input, Button } from 'antd';
import { localStorage_key } from './constant'

class GenerateScript extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      rootPath: ''
    }
  }

  updateRootPath (evt) {
    this.setState({rootPath: evt.currentTarget.value})
  }

  onGenerateBtn () {
    this.outputScript()
  }

  outputScript () {
    let list = JSON.parse(localStorage.getItem(localStorage_key)).step2.data
    let script = `
    var fs = require('fs');
var path = require('path');

const ROOT_PATH = "${this.state.rootPath.replace(/\\/g, '\\\\')}";
const PROPERTY_PATH = path.join(ROOT_PATH, './web-main/src/main/resources');

const PROPERTY_FILE_MAP = {
  en: ['billing.properties', 'billinggov.properties'],
  es: 'billing_es_ES.properties',
  fr: 'billing_fr_FR.properties',
  jp: 'billing_jp_JP.properties',
  kr: 'billing_ko_KO.properties',
  pt: 'billing_pt_PT.properties',
  de: 'billing_de_DE.properties',
  it: 'billing_it_IT.properties',
  ru: 'billing_ru_RU.properties',
  vi: 'billing_vi_VN.properties',
  'zh-cn': 'billing_zh_CN.properties',
  'zh-tw': 'billing_zh_TW.properties',
  pl: 'billing_pl_PL.properties',
  tr: 'billing_tr_TR.properties',
}

const wordingList = [
  ${list.map(item => JSON.stringify(item) + '\n')}
]

function main () {
  if (!checkPathValid()) {
    console.warn('Root Path is invalid.')
  }
  doFetch()
}

function checkPathValid () {
  return fs.existsSync(path.join(PROPERTY_PATH, 'billing.properties'))
}
function doFetch () {
  Object.keys(PROPERTY_FILE_MAP).forEach(lang => {
    let fileNames = PROPERTY_FILE_MAP[lang]
    if (typeof fileNames === 'string') {
      fileNames = [fileNames]
    }

    fileNames.forEach(file => {
      let fileContent = getFileContent(path.join(PROPERTY_PATH, file))
      wordingList.forEach(wording => {
        let {i18nKey} = wording
        let curLangValue = wording[lang] || wording[lang.toUpperCase()]
        if (curLangValue && i18nKey) {
          fileContent = updateArrKey(fileContent, i18nKey, curLangValue)
        } else {
          console.warn('key=' + key + ',value=' + value)
        }
      })
      // save file
      fs.writeFileSync(path.join(PROPERTY_PATH, file), fileContent)
      console.log('Save ' + file +' success.')
    })
  })
}
function getFileContent (filePath) {
  let fileContent = fs.readFileSync(filePath)
  return fileContent
}

function encodeUnicode (str) {
  let result = ''
  for (let idx = 0; idx < str.length; idx++) {
    let char = str[idx]
    result += encodeChar(char)
  }
  return result
  function encodeChar (char) {
    let asciiIdx = char.charCodeAt(0), hexStr = char
    const doNotNeedEncode = asciiIdx >= 32 && asciiIdx <= 126
    if (!doNotNeedEncode) {
      hexStr = asciiIdx.toString(16).toUpperCase()
      if (hexStr.length < 4) {
        hexStr = (new Array(4 - hexStr.length + 1)).join('0') + hexStr
      }
    }
    return doNotNeedEncode ? char : '\\u' + hexStr
  }
}

function updateArrKey (content, key, value) {
  value = encodeUnicode(value || "")
  let existReg = new RegExp(key + '=[^\\n]+')
  if (existReg.test(key)) {
    return content.replace(existReg, key + '=' + value)
  } else {
    return content + '\\n' + key + '=' + value
  }
}

main();
    `
    console.log(script.trim())
  }

  render () {
    return <div>
      <Input placeholder='Root path of web project in you local'
        value={this.state.rootPath} style={{width: '500px',marginRight: '20px'}}
        onChange={this.updateRootPath.bind(this)}/>
      <Button type="primary" disabled={!this.state.rootPath}
        onClick={() => this.onGenerateBtn()}>OK</Button>
      <div className='script-block'>
        <div></div>
      </div>
    </div>
  }
}

export default connect(mapStateToProps, mapDispatchToProps, null, {forwardRef: true})(GenerateScript)

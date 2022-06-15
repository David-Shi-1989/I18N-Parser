var fs = require('fs');
var path = require('path');

const ROOT_PATH = "C:\\Dev\\gitlab\\web-web\\web-master";
const PROPERTY_PATH_WEB = path.join(ROOT_PATH, './web-main/src/main/resources');
const PROPERTY_PATH_FE_BILLING = path.join(ROOT_PATH, './properties');
var PROPERTY_PATH = "";

const PROPERTY_FILE_MAP = {
  en: ['billing.properties', 'billinggov.properties', 'billing_gov_EN.properties'],
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
]

function main () {
  if (!checkPathValid()) {
    console.warn('Root Path is invalid.')
  }
  doFetch()
}

function checkPathValid () {
  if (fs.existsSync(path.join(PROPERTY_PATH_WEB, 'billing.properties'))) {
    PROPERTY_PATH = PROPERTY_PATH_WEB;
  } else if (fs.existsSync(path.join(PROPERTY_PATH_FE_BILLING, 'billing.properties'))) {
    PROPERTY_PATH = PROPERTY_PATH_FE_BILLING;
  }
  return !!PROPERTY_PATH
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
  let existReg = new RegExp(key + '=[^\n]+')
  if (existReg.test(key)) {
    return content.replace(existReg, key + '=' + value)
  } else {
    return content + '\n' + key + '=' + value
  }
}

main();
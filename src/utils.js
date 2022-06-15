export function decodeUnicode (str) {
  let matchArr = str.match(/\\u[0-9A-Fa-f]{4}/g)
  if (matchArr) {
    for (let i = 0; i < matchArr.length; i++) {
      let curUnicodeStr = matchArr[i]
      let translatedStr = decodeAnWord(curUnicodeStr)
      str = str.replace(curUnicodeStr, translatedStr)
    }
  }
  return str
  function decodeAnWord (str) {
    let hexVal = str.replace(/^\\u/, '')
    let val = parseInt(hexVal, 16)
    return String.fromCharCode(val)
  }
}

export function encodeUnicode (str) {
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

export function copyTo (text) {
  let tmpInput = document.createElement('textarea')
  tmpInput.value = text
  document.body.appendChild(tmpInput)
  tmpInput.select()
  document.execCommand("Copy")
  tmpInput.remove()
}

export function fileSize (val) {
  let b = val
  if (b < 1024) {
    return `${b.toFixed(1)} B`
  }
  let kb = parseFloat((b / 1024).toFixed(1))
  if (kb < 1024) {
    return `${kb.toFixed(1)} KB`
  }
  let mb = parseFloat((b / (1024 * 1024).toFixed(1)))
  if (mb < 1024) {
    return `${mb.toFixed(1)} MB`
  }
  let gb = parseFloat((b / (1024 * 1024 * 1024).toFixed(1)))
  return `${gb.toFixed(1)} GB`
}

export const LangList = [
  {lang: 'English', flag: ['en']},
  {lang: 'Universal Spanish', flag: ['es']},
  {lang: 'French', flag: ['fr']},
  {lang: 'Japanese', flag: ['jp']},
  {lang: 'Korean', flag: ['kr', 'ko']},
  {lang: 'Brazilian Portuguese', flag: ['pt']},
  {lang: 'German', flag: ['de']},
  {lang: 'Italian', flag: ['it']},
  {lang: 'Russian', flag: ['ru']},
  {lang: 'Vietnamese', flag: ['vi']},
  {lang: 'Chinese simplified (mainland)', flag: ['zh-cn']},
  {lang: 'Chinese Traditional (Taiwan)', flag: ['zh-tw']},
  {lang: 'Polish', flag: ['pl']},
  {lang: 'Turkish', flag: ['tr']}
]
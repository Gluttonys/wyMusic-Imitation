function formatTime(second) {
  /**
   * second : Number : 事件秒数
   */
  second = parseInt(second)
  let hour = (parseInt(second / 3600) + "").padStart(2, "0")
  let minute = (parseInt((second - hour * 3600) / 60) + "").padStart(2, "0")
  let sec = (second % 60 + "").padStart(2, "0")

  if (hour !== "00") {
    return `${hour}:${minute}:${sec}`
  } else {
    return `${minute}:${sec}`
  }
}

function formatBigNumber(number) {
  if (number <= 10000) {
    return number
  } else if (number <= 20000) {
    return `${1}万${number - 10000}`
  } else if (number <= 100000) {
    let wan = Math.floor(number / 10000)
    let qian = Math.floor((number - wan * 10000) / 1000)
    return `${wan}万${qian}`
  } else {
    return `${Math.floor(number / 10000)}万`
  }
}


function formatMillisecond(millisecond) {
  let second = millisecond / 1000
  let min = parseInt(second / 60).toString().padStart(2, "0")
  let sec = parseInt(second % 60).toString().padStart(2, "0")
  return `${min}:${sec}`
}

function getLocalStorageObj() {
  /**
   * 获取首页搜索记录的对象
   * key 值开头必须是 wy-history 的键
   */
  const result = {}

  for (let item of Object.keys(window.localStorage)) {
    if (item.startsWith("wy-history")) {
      result[item] = window.localStorage[item]
    }
  }

  return result
}

function setHistoryForWY(key, value) {
  /**
   * 给定指定的键值对， 这是 localStorage
   */
  window.localStorage["wy-history" + key] = value
}

function delHistoryForXY(key) {
  /**
   * 删除指定 key 的 localStorage
   */
  window.localStorage.removeItem("wy-history" + key)
}


export {
  formatTime,
  formatBigNumber,
  formatMillisecond,
  getLocalStorageObj,
  setHistoryForWY,
  delHistoryForXY
}

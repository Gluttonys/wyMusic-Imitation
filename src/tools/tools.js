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
  /**
   * 格式化 大数
   */
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
  /**
   * 格式化毫秒数， 用来计算歌曲播放的时间
   */
  let second = millisecond / 1000
  let min = parseInt(second / 60).toString().padStart(2, "0")
  let sec = parseInt(second % 60).toString().padStart(2, "0")
  return `${min}:${sec}`
}

function formatTimeStamp(num, fmt = "yyyy-MM-dd HH:mm:ss.S") {
  /**
   * num : 时间戳
   * fmt : 格式化模板
   */
  let date = new Date(num)
  let obj = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "H+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    "S": date.getMilliseconds() //毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length))
  }

  Object.keys(obj).forEach(k => {
    if (new RegExp(`(${k})`).test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (obj[k]) : (("00" + obj[k]).substr(("" + obj[k]).length)))
    }
  })

  return fmt
}

function backToStamp(timeStr) {
  /* 
    [01:23.448]
    将此类时间转换为时间戳 83 s
  */
 let result = 0
  timeStr.replace(/\[(\d{2}):(\d{2})\.\d{0,3}\]/, (_, $min, $sec) => {
    result = parseInt($min) * 60 + parseInt($sec)
  })
  return result
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

function inError(mes, error) {
  this.$message.error(`获取${mes}失败， 请打开控制台查看报错信息`)
  console.error(error)
}


Array.prototype.first = function () {
  // 返回数组中的第一个元素
  return this[0]
}

Array.prototype.last = function () {
  // 返回数组中的最后一个元素
  return this.slice(-1)[0]
}

export {
  formatTime,
  formatBigNumber,
  formatMillisecond,
  formatTimeStamp,
  getLocalStorageObj,
  setHistoryForWY,
  delHistoryForXY,
  inError,
  backToStamp
}
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
    return `${1}万${number- 10000}`
  } else if (number <= 100000) {
    let wan = Math.floor(number / 10000)
    let qian = Math.floor((number - wan * 10000)/1000)
    return `${wan}万${qian}`
  } else {
    return `${Math.floor(number/10000)}万`
  }
}


export {formatTime, formatBigNumber}

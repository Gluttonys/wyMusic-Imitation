import eventBus from "./eventBus"

// 发射事件， 通知用户已经登录
function informLoged() {
  eventBus.$emit("isLogined")
}

// 通知左下角的音乐块换歌
function informGetMusic(options) {
  eventBus.$emit("getMusic", options)
}

// 通知底下得音乐控制条换歌 控制播放音乐
function informChangeMusic(options) {
  eventBus.$emit("changeMusic", options)
}

// 音乐列表页 上面获取的歌单信息中的音乐列表 ids 传递给下面的列表片段
function informIds(options) {
  eventBus.$emit("getIDs", options)
}

// 携带 评论数量
function loadDataFromInfo({commandCount}) {
  eventBus.$emit("getCommandCount", commandCount)
}


export {
  informLoged,
  informGetMusic,
  informChangeMusic,
  informIds,
  loadDataFromInfo
}

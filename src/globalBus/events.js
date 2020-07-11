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


export {informLoged, informGetMusic, informChangeMusic}

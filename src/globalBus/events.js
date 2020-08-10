import eventBus from "./eventBus"

// 发射事件， 通知用户已经登录
function informLoged() {
  eventBus.$emit("isLogined")
}

// 通知左下角的音乐块换歌
function informGetMusic(id) {
  /**
   * 使用此方法， 可以从任意地方更换歌曲， 只要传递歌曲的ID
   */
  eventBus.$emit("getMusic", id)
}

// 通知底下得音乐控制条换歌 控制播放音乐
function informChangeMusic(id) {
  eventBus.$emit("changeMusic", id)
}

// 音乐列表页 上面获取的歌单信息中的音乐列表 ids 传递给下面的列表片段
function informIds(options) {
  eventBus.$emit("getIDs", options)
}

// 携带 评论数量
function loadDataFromInfo({commandCount}) {
  /**
   * 歌单页面
   */
  eventBus.$emit("getCommandCount", commandCount)
}

function informDumpToPoint(second) {
  /** 
    通知底下的控制条将音乐跳转到指定的时间点
    这个操作往往是通过单机歌词实现的
  */
  eventBus.$emit("dumpToPoint", second)
}

function informMusicSecond(second) {
  eventBus.$emit("lyricChangeSecond", second)
}

function informRotate(state) {
  /* 通知音乐播放页面的图片的旋转状态 */
  eventBus.$emit("informRutate", state)
}

function loadStampTimeFromMusicInfo(timeArr) {
  /*  
    将正在播放的音乐的歌词时间列表发送至底部控制栏
    timeArr: Array<number>
    ps : [1, 3, 6, 45, 62, ...] 
   */ 
  eventBus.$emit("loadStampTimeFromMusicInfo", timeArr)
}


export {
  informLoged,
  informGetMusic,
  informChangeMusic,
  informIds,
  loadDataFromInfo,
  informDumpToPoint,
  informRotate,
  loadStampTimeFromMusicInfo,
  informMusicSecond
}

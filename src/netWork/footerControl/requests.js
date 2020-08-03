import {request} from "../request"

/**
 * 该网络请求模块包含了 左下角的小音乐模块， 以及底部的音乐控制栏
 *
 * ps : 哪个小的音乐模块用的网络请求只有一个， 我不想再新创建一个文件了
 * @param id
 */

// -----------  音乐块  -------------

function getInfoMusic(id) {
  /**
   * 获取歌曲的基本信息， 例如歌曲名， 歌手名， 歌曲封面图片等
   */
  return request({
    url: "/song/detail",
    params: {
      ids: id
    }
  })
}

function checkMusic(id) {
  /**
   * 检查歌曲是否可用， 是否有版权限制
   */
  return request({
    url: "/check/music",
    params: {id}
  })
}

// -----------  底部控制栏  -------------

function getDetailMusic(id) {
  /**
   * 获取歌曲的 URL 播放信息
   * */

  return request({
    url: "/song/url",
    params: {
      id: id
    }
  })
}


export {
  getDetailMusic,
  getInfoMusic,
  checkMusic
}

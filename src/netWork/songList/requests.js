import {request} from "../request"

function getPlaylistDetail(options) {
  /**
   * 获取通过歌单的 id 获取该歌单的基本信息，作者，创建事件，首图等等
   */
  return request({
    url: "/playlist/detail",
    params: {
      id: options.id
    }
  })
}

function getMusic({ids}) {
  /**
   * 通过 id 列表， 获取整个歌单的所有音乐信息
   */
  return request({
    url: "/song/detail",
    params: {
      ids
    }
  })
}

function getPlaylistCommand({id, limit, offset}) {
  /**
   * 通过歌单的 id 获取该歌单的所有评论信息
   *
   * id : 歌单的唯一 ID
   * limit : 用于分页， 每次取出多少条评论
   * offset : 偏移量
   *
   * 这个属性我也不知道咋用， 先放着吧
   * before: 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过5000条评论的时候需要用到)
   *
   */

  return request({
    url: "/comment/playlist",
    params: {
      id, limit, offset
    }
  })

}

function getCollector({id, limit, offset}) {
  return request({
    url: "/playlist/subscribers",
    params: {
      id, limit, offset
    }
  })
}


export {
  getPlaylistDetail,
  getMusic,
  getPlaylistCommand,
  getCollector
}

import {
  request
} from '../request';

function getLyric(id) {
  /* 通过歌曲的 id 获取歌曲信息 */
  return request({
    url: '/lyric',
    params: {
      id: id
    }
  });
}

function getCommend({id, limit, offset}) {
  /**
   * id : 歌曲ID
   * limit : 每次返回数量， 分页数量
   * offset : 偏移量， 用于分页
   *  */
  return request({
    url: '/comment/music',
    params: {
      id,
      limit,
      offset
    }
  })
}

function getPlayListByMusic(id) {
  /**
  * 根据歌曲的 id 获取 相似的歌单， 实际上应该是包含该歌曲的歌单
  * */
  return request({
    url: "/simi/playlist",
    params: {id}
  })
}

function getMusicByMusic(id) {
  /**
   * 根据歌曲的id获取相似的歌曲列表
   * */
  return request({
    url: "/simi/song",
    params: {id}
  })
}

export {
  getLyric,
  getCommend,
  getPlayListByMusic,
  getMusicByMusic
}
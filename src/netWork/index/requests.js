import {request} from "../request"

// ======================首页========================

function getRotation(options) {
  /**
   * 这里请求的是首页的轮播图数据
   * 因为我也找不到接口了
   * 所以使用了热门的接口， 默认值直接给了 0 表示全部热门
   */
  return request({
    url: "/top/song",
    params: {type: 0}
  })
}

function getRecommendSongList(options) {
  /**
   * 获取个性推荐列表， 首页轮播图下面的第一个模块的
   */
  return request({
    url: "/personalized",
    params: {
      limit: options.size
    }
  })
}

function getSole(options) {
  /**
   * 获取独家放送接口
   */
  return request({
    url: "/personalized/privatecontent/list",
    params: {
      limit: options.size
    }
  })
}

function getLatesMusic(options) {
  /**
   * 获取最新的音乐
   */
  return request({
    url: "/personalized/newsong"
  })
}

function getRecommendMV(options) {
  return request({
    url: "/personalized/mv"
  })
}

function getAnchorStation(options) {
  return request({
    url: "/dj/hot",
    params: {
      limit: options.size
    }
  })
}

// ======================歌单========================

function getAllType() {
  /**
   * 获取全部歌单类型
   */
  return request({
    url: "/playlist/catlist"
  })
}

function getHotType() {
  /**
   * 获取热门歌单类型
   */
  return request({
    url: "/playlist/hot"
  })
}

function getAllSongSheet(options) {
  return request({
    url: "/top/playlist",
    params: {
      limit: options.size,
      offset: options.offset
    }
  })
}

// ======================主播电台====================

function getRotationChartForStation() {
  /**
   * 获取主播电台页面的轮播图数据
   */
  return request({
    url: "/dj/banner"
  })
}

function getAllTypeForStation() {
  /**
   * 获取主播电台的全部分类
   */
  return request({
    url: "/dj/catelist"
  })
}

function getToplistPay(options) {
  /**
   * 获取电台付费精品
   */
  return request({
    url: "/dj/paygift",
    params: {
      limit: options.size
    }
  })

}


function getDjRecommend() {
  /**
   * 获取电台个性推荐
   */
  return request({
    url: "/dj/recommend"
  })
}


export {
  // 首页
  getRotation,
  getRecommendSongList,
  getSole,
  getLatesMusic,
  getRecommendMV,
  getAnchorStation,
  //  歌单类
  getAllType,
  getHotType,
  getAllSongSheet,
  // 主播电台
  getRotationChartForStation,
  getAllTypeForStation,
  getToplistPay,
  getDjRecommend
}

import {request} from "../request"
import {searchType} from "@/localData"

function getUserLogin(options) {
  /**
   * 登录接口
   */
  return request({
    url: "/login/cellphone",
    params: {
      phone: options.phone,
      password: options.password
    }
  })
}

function getHotSearch() {
  /**
   * 搜做中的热门搜索
   */
  return request({
    url: "/search/hot"
  })
}

function getDefaultKeyWord() {
  return request({
    url: "/search/default"
  })
}

function getResult(options) {
  /**
   * 搜索请求
   * keywords : 搜索的关键字， 这个参数是必须的
   * type 类型
   */
  return request({
    url: "/search",
    params: {
      keywords: options.keywords,
      type: options.type || searchType.all
    }
  })
}


export {
  getUserLogin,
  getHotSearch,
  getDefaultKeyWord,
  getResult
}

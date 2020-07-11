import {request} from "../request"

function getPlayList(options) {
  return request({
    url: "/user/playlist",
    params: {uid: options.uid}
  })
}




export {getPlayList}

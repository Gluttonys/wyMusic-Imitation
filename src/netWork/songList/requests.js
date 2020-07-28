import {request} from "../request"

function getPlaylistDetail(options) {
  return request({
    url: "/playlist/detail",
    params: {
      id: options.id
    }
  })
}


export {getPlaylistDetail}

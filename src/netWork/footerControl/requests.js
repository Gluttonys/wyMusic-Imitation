import {request} from "../request"

function getDetailMusic(id) {
  return request({
    url: "/song/url",
    params: {
      id: id
    }
  })
}


export {getDetailMusic}

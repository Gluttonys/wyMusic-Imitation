import {request} from "../request"

function getUserLogin(options) {
  return request({
    url: "/login/cellphone",
    params: {
      phone: options.phone,
      password: options.password
    }
  })
}


export {getUserLogin}

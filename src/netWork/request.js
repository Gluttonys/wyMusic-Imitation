import axios from 'axios'

function request(config) {

  // 创建实例
  let instance = axios.create({
    baseURL: "http://localhost:3000/",
    // timeout: 5000
  })

  instance.interceptors.request.use(function (config) {
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

  instance.interceptors.response.use(function (response) {
    return response.data;
  }, function (error) {
    return Promise.reject(error);
  });

  return instance(config)
}

export {request}

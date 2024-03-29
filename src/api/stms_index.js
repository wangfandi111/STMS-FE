import axios from 'axios'

axios.defaults.withCredentials = true
const http = axios.create({
  baseURL: 'http://api.dreamspark.com.cn/',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
  // transformRequest: [function (data) {
  //   let newData = ''
  //   for (const k in data) {
  //     if (data.hasOwnProperty(k) === true) {
  //       newData += encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&'
  //     }
  //   }
  //   return newData
  // }]
})

function apiAxios (method, url, params, response) {
  http({
    method: method,
    url: url,
    data: method === 'POST' || method === 'PUT' ? params : null,
    params: method === 'GET' || method === 'DELETE' ? params : null
  }).then(function (res) {
    response(res)
  }).catch(function (err) {
    response(err)
  })
}

export default {
  get: function (url, params, response) {
    return apiAxios('GET', url, params, response)
  },
  post: function (url, params, response) {
    return apiAxios('POST', url, params, response)
  },
  put: function (url, params, response) {
    return apiAxios('PUT', url, params, response)
  },
  delete: function (url, params, response) {
    return apiAxios('DELETE', url, params, response)
  }
}
http.defaults.withCredentials = true

import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:3000'

export default {
  get (url, params) {
    return axios.get(url, {
      params: params
    }).then(response => {
      return response.data
    })
  },
  post (url, payload) {
    return axios.post(url, payload).then(response => {
      return response.data
    })
  },
  patch (url, payload) {
    return axios.patch(url, payload).then(response => {
      return response.data
    })
  },
  delete (url, param) {
    return axios.delete(url, {
      data: param
    }).then(response => {
      return response.data
    })
  }
}

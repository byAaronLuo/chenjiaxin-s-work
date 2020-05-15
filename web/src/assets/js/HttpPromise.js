/*
 * @Description:
 * @Version: 1.0
 * @Autor: AaronLuo
 * @Date: 2020-05-14 20:32:19
 * @LastEditors: AaronLuo
 * @LastEditTime: 2020-05-15 14:05:54
 */
import axios from 'axios'
export default class HttpPromise {
  constructor () {
    this.params = {}
  }

  get uri () {
    return this.params.uri
  }

  set uri (uri) {
    this.params.uri = uri
  }

  get methodToServer () {
    return this.params.method
  }

  set methodToServer (method) {
    this.params.method = method
  }

  get options () {
    return this.params.options
  }

  set options (params) {
    this.params.options = params
  }

  get headers () {
    return this.params.header
  }

  set headers (header) {
    return this.params.header
  }

  ajaxPostPromise () {
    return axios({
      url: this.uri,
      method: this.methodToServer,
      data: this.options,
      headers: this.headers
    }).then(response => {
      return response.data
    })
  }

  ajaxGetPromise () {
    return axios({
      url: this.uri,
      method: this.methodToServer,
      params: this.options,
      headers: this.headers
    }).then(response => {
      return response.data
    })
  }
}

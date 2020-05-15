import HttpPromise from './HttpPromise'
import { getRemoteAddress } from './ip'
function searchMap (key) {
  const map = new Map()
  map.set('LOGIN', 'login')
  return map.get(key)
}
function urlConstruct (key) {
  const remoteAddress = getRemoteAddress()
  const url = searchMap(key)
  return remoteAddress + url
}
export default function askDataToServer ({
  url,
  method = 'get',
  params = {},
  headers = {}
}) {
  const promise = new HttpPromise()
  promise.uri = urlConstruct(url)
  promise.options = params
  promise.methodToServer = method
  promise.headers = headers
  return promise.ajaxPromise()
}

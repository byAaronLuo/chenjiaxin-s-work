// eslint-disable-next-line no-unused-vars
import HttpPromise from './HttpPromise'
import { getRemoteAddress } from './ip'
function searchMap (key) {
  const map = new Map()
  map.set('LOGIN', 'worker/login')
  map.set('LOGOUT', 'worker/logout')
  map.set('GETWORKERINFO', 'worker/get')
  map.set('UPDATEPERSONINFO', 'worker/update')
  map.set('GETALLWORKERLIST', 'worker/list')
  map.set('CREATEWORKER', 'worker/create')
  map.set('UPDATEWORKER', 'worker/update')
  map.set('DELETEWORKER', 'worker/delete')
  map.set('GETROOMLIST', 'room/list')
  map.set('CREATEROOM', 'room/create')
  map.set('UPDATEROOM', 'room/update')
  map.set('DELETEROOM', 'room/delete')
  return map.get(key)
}
// eslint-disable-next-line no-unused-vars
function urlConstruct (key) {
  const remoteAddress = getRemoteAddress()
  const url = searchMap(key)
  // console.log(url)
  return remoteAddress + url
}
export default function getServerData ({
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
  if (method === 'post') { return promise.ajaxPostPromise() } else { return promise.ajaxGetPromise() }
}

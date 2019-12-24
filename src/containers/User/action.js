import { createActions } from 'redux-actions'
import fetch from 'lib/fetch'
import queryString from 'querystring'

export const USER = {
  LIST: 'USER.LIST',
  DELETE: 'USER.DELETE',
  RESET: 'USER.RESET',
  DETAIL: 'USER.DETAIL',
  CREATE: 'USER.CREATE',
}

export default createActions({
  [USER.LIST]: (param) => fetch.get('admin/user/list?' + queryString.stringify(param)),
  [USER.DELETE]: (id) => fetch.post('admin/user/delete', { id }),
  [USER.RESET]: (param) => fetch.post('admin/user/resetPwd', param),
  [USER.DETAIL]: (userId) => fetch.get('admin/user/detail?id=' + userId),
  [USER.CREATE]: (param) => fetch.post('admin/user/save', param),
})
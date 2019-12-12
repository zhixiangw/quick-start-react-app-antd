import { createActions } from 'redux-actions'
import fetch from 'lib/fetch'

export const USER = {
  LIST: 'LIST',
  DELETE: 'DELETE',
  RESET: 'RESET',
}

export default createActions({
  [USER.LIST]: (param) => fetch.post('admin/user/findAppUser', param),
  [USER.DELETE]: (id) => fetch.post('admin/user/delete', { id }),
  [USER.RESET]: (param) => fetch.post('admin/user/resetPwd', param),
})
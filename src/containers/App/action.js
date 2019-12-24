import { createActions } from 'redux-actions'
import fetch from 'lib/fetch'

export const APP = {
  LOGIN: 'APP.LOGIN',
  LOGOUT: 'APP.LOGOUT',
  INFO: 'APP.INFO',
  RESET: 'APP.RESET'
}

export default createActions({
  [APP.LOGIN]: param => fetch.post('admin/user/login', param),
  [APP.LOGOUT]: () => fetch.post('admin/user/logout'),
  [APP.INFO]: () => fetch.get('admin/user/info'),
  [APP.RESET]: (param) => fetch.post('admin/user/changePwd', param),
})
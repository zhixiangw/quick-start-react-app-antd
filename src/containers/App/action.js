import { createActions } from 'redux-actions'
import fetch from 'lib/fetch'

export const APP = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  INFO: 'INFO',
  RESET: 'RESET'
}

export default createActions({
  [APP.LOGIN]: param => fetch.post('admin/user/login', param),
  [APP.LOGOUT]: () => fetch.post('admin/user/logout'),
  [APP.INFO]: () => fetch.get('admin/user/info'),
  [APP.RESET]: () => fetch.post('admin/user/changePwd'),
})
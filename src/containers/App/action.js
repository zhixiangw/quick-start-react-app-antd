import { createActions } from 'redux-actions'
import fetch from 'lib/fetch'

export const APP = {
  LOGIN: 'LOGIN'
}

export default createActions({
  [APP.LOGIN]: param => fetch.post('admin/login/login', param)
})
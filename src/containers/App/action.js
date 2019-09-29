import { createActions } from 'redux-actions'
import apiRequest from 'lib/request.service'

export const APP = {
  LOGIN: 'LOGIN'
}

export default createActions({
  [APP.LOGIN]: param => apiRequest({
    _url: 'system.login',
    data: param
  }, false)
})
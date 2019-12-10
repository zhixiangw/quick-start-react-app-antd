import { createActions } from 'redux-actions'
import fetch from 'lib/fetch'

export const APP = {
  LOGIN: 'LOGIN',
  INFO: 'INFO',
}

export default createActions({
  [APP.LOGIN]: param => fetch.post('admin/login/login', param),
  [APP.INFO]: () => fetch.get('admin/order/orderList'),
})
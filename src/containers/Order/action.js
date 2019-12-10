import { createActions } from 'redux-actions'
import fetch from 'lib/fetch'
import queryString from 'querystring'

export const ORDER = {
  LIST: 'LIST',
  DETAIL: 'DETAIL',
}

export default createActions({
  [ORDER.LIST]: (param) => fetch.get('admin/order/orderList?'+ queryString.stringify(param)),
  [ORDER.DETAIL]: orderId => fetch.get(`admin/order/orderDetail?id=${orderId}`)
})
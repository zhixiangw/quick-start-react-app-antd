import { createActions } from 'redux-actions'
import fetch from 'lib/fetch'
import queryString from 'querystring'

export const ORDER = {
  LIST: 'ORDER.LIST',
  DETAIL: 'ORDER.DETAIL',
  SUBMIT: 'ORDER.SUBMIT',
  REFUND: 'ORDER.REFUND',
}

export default createActions({
  [ORDER.LIST]: (param) => fetch.get('admin/order/orderList?' + queryString.stringify(param)),
  [ORDER.DETAIL]: orderId => fetch.get(`admin/order/orderDetail?id=${orderId}`),
  [ORDER.SUBMIT]: ({ orderId, ...rest }) => fetch.post(
    `admin/order/ticket?id=${orderId}`, rest),
  [ORDER.REFUND]: (param) => fetch.post(`admin/order/refund`, param),
})
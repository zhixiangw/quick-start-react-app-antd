import { createActions } from 'redux-actions'
import fetch from 'lib/fetch'

export const ORDER = {
  LIST: 'LIST',
  DETAIL: 'DETAIL',
}

export default createActions({
  [ORDER.LIST]: () => fetch.get('admin/order/orderList'),
  [ORDER.DETAIL]: orderId => fetch.get(`admin/order/orderDetail?id=${orderId}`)
})
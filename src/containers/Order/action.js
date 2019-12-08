import { createActions } from 'redux-actions'
import fetch from 'lib/fetch'

export const ORDER = {
  LIST: 'LIST',
  DETAIL: 'DETAIL',
}

export default createActions({
  [ORDER.LIST]: param => fetch.get('admin/orderList', param),
  [ORDER.DETAIL]: param => fetch.get('admin/orderDetail', param)
})
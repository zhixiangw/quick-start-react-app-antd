import { handleActions } from 'redux-actions'
import { ORDER } from './action'

const initState = {
  orderList: [],
  count: 0,
  orderDetail: {}
}

export default handleActions(
  {
    [ORDER.LIST + '_FULFILLED']: (state, { payload }) => {
      const { data: { count, items = [] } } = payload
      return { ...state, orderList: items, count }
    },
    [ORDER.DETAIL + '_FULFILLED']: (state, { payload }) => {
      const { data } = payload
      return { ...state, orderDetail: data}
    }
  },
  initState
)
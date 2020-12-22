import { handleActions } from 'redux-actions'
import { VOUCHER } from './action'

const initState = {
  allMemberType: [],
  list: [],
  count: 0
}

export default handleActions(
  {
    [VOUCHER.MEMBERLIST + '_FULFILLED']: (state, { payload }) => {
      const { data: { count, items = [] } } = payload
      return { ...state, list: items, count }
    },
    [VOUCHER.MOVIELIST + '_FULFILLED']: (state, { payload }) => {
      const { data: { count, items = [] } } = payload;
      return { ...state, list: items, count }
    },
    [VOUCHER.SNACKSLIST + '_FULFILLED']: (state, { payload }) => {
      const { data: { count, items = [] } } = payload
      return { ...state, list: items, count }
    },
    [VOUCHER.ALLMEMBERTYPE + '_FULFILLED']: (state, { payload }) => {
      const { data: { items = [] } } = payload;
      return { ...state, allMemberType: items }
    },
    [VOUCHER.MEMBERCARDLIST + '_FULFILLED']: (state, { payload }) => {
      const { data: { count, items = [] } } = payload
      return { ...state, list: items, count }
    },
  },
  initState
)
import { handleActions } from 'redux-actions'
import { VOUCHER } from './action'

const initState = {
  allMemberType: [],
  list: [],
  count: 0,
  detail: {}
}

export default handleActions(
  {
    [VOUCHER.MEMBERLIST + '_FULFILLED']: (state, { payload }) => {
      const { data: { count, items = [] } } = payload
      return { ...state, list: items, count }
    },
    [VOUCHER.MEMBERDETAIL + '_FULFILLED']: (state, { payload }) => {
      const { data } = payload
      return { ...state, detail: data }
    },
    [VOUCHER.MOVIELIST + '_FULFILLED']: (state, { payload }) => {
      const { data: { count, items = [] } } = payload
      return { ...state, list: items, count }
    },
    [VOUCHER.MOVIEDETAIL + '_FULFILLED']: (state, { payload }) => {
      const { data } = payload
      return { ...state, detail: data }
    },
    [VOUCHER.SNACKSLIST + '_FULFILLED']: (state, { payload }) => {
      const { data: { count, items = [] } } = payload
      return { ...state, list: items, count }
    },
    [VOUCHER.SNACKSDETAIL + '_FULFILLED']: (state, { payload }) => {
      const { data } = payload
      return { ...state, detail: data }
    },
    [VOUCHER.ALLMEMBERTYPE + '_FULFILLED']: (state, { payload }) => {
      const { data: { items = [] } } = payload;
      return { ...state, allMemberType: items }
    },
  },
  initState
)
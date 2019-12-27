import { handleActions } from 'redux-actions'
import { CINEMA } from './action'

const initState = {
  userList: [],
  count: 0,
  userDetail: {}
}

export default handleActions(
  {
    [CINEMA.LIST + '_FULFILLED']: (state, { payload }) => {
      const { data: { count, items = [] } } = payload
      return { ...state, list: items, count }
    },
    [CINEMA.DETAIL + '_FULFILLED']: (state, { payload }) => {
      const { data } = payload
      return { ...state, detail: data }
    },
    [CINEMA.CINEMATAGS + '_FULFILLED']: (state, { payload }) => {
      const { data } = payload
      return { ...state, cinemaTags: data }
    },
    [CINEMA.TAGS + '_FULFILLED']: (state, { payload }) => {
      const { data } = payload
      return { ...state, tags: data }
    },
  },
  initState
)
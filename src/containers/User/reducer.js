import { handleActions } from 'redux-actions'
import { USER } from './action'

const initState = {
  userList: [],
  count: 0,
  userDetail: {}
}

export default handleActions(
  {
    [USER.LIST + '_FULFILLED']: (state, { payload }) => {
      const { data: { count, items = [] } } = payload
      return { ...state, userList: items, count }
    },
    [USER.DETAIL + '_FULFILLED']: (state, { payload }) => {
      const { data } = payload
      return { ...state, userDetail: data}
    },
  },
  initState
)
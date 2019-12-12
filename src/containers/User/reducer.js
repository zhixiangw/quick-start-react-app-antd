import { handleActions } from 'redux-actions'
import { USER } from './action'

const initState = {
  userList: [],
}

export default handleActions(
  {
    [USER.LIST + '_FULFILLED']: (state, { payload }) => {
      const { data } = payload
      const isValidUser = data.id
      return { ...state, userList: isValidUser ? [data] : [] }
    },
  },
  initState
)
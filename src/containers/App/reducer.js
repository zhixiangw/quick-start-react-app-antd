import { handleActions } from 'redux-actions'
import { APP } from './action'
import { message } from 'antd'

const initState = {  }

export default handleActions(
  {
    [APP.LOGIN + '_FULFILLED']: (state, { payload }) => {
      const { message: msg, data } = payload
      message.info(msg)
      return { ...state, loginInfo: data }
    }
  },
  initState
)
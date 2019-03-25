import { handleActions } from 'redux-actions'
import { APP } from './action'

const initState = { counter: 1 }

export default handleActions(
  {
    [APP.INCREMENT_COUNT + '_FULFILLED']: (state, { payload }) => {
      return { ...state, counter: payload }
    },
    [APP.DECREMENT_COUNT + '_FULFILLED']: (state, { payload }) => {
      return { ...state, counter: payload }
    }
  },
  initState
)
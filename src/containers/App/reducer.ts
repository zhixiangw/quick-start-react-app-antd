import { handleActions } from 'redux-actions'
import { APP } from './action'
import { Reducer } from 'redux'

const initState = { counter: 1 }

export default handleActions(
  {
    [APP.INCREMENT_COUNT + '_FULFILLED']: (state, { payload }): Reducer => {
      return { ...state, counter: payload }
    },
    [APP.DECREMENT_COUNT + '_FULFILLED']: (state, { payload }): Reducer => {
      return { ...state, counter: payload }
    }
  },
  initState
)
import { handleActions } from 'redux-actions'
import { MOVIES } from './action'

const initState = {
  list: [],
  searchItems: [],
  count: 0,
  detail: {}
}

export default handleActions(
  {
    [MOVIES.MOVIESSEARCH + '_FULFILLED']: (state, { payload }) => {
      const { data: { items = [] } } = payload
      return { ...state, searchItems: items }
    },
  },
  initState
)
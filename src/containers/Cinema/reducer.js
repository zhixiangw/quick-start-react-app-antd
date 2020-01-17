import { handleActions } from 'redux-actions'
import { CINEMA } from './action'

const initState = {
  userList: [],
  count: 0,
  userDetail: {}
}

export default handleActions(
  {
    [CINEMA.ALL + '_FULFILLED']: (state, { payload }) => {
      const { data } = payload
      return { ...state, allCinemas: data }
    },
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
    [CINEMA.TAGSLIST + '_FULFILLED']: (state, { payload }) => {
      const { data: { count, items = [] } } = payload
      return { ...state, tagsList: items, tagsCount: count }
    },
    [CINEMA.TAGSINFO + '_FULFILLED']: (state, { payload }) => {
      const { data } = payload
      return { ...state, tagsInfo: data }
    },
  },
  initState
)
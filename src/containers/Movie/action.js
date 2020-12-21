import { createActions } from 'redux-actions'
import fetch from 'lib/fetch'
import queryString from 'querystring'

export const MOVIES = {
  MOVIESSEARCH: 'MOVIES.SEARCH',
}

export default createActions({
  [MOVIES.MOVIESSEARCH]: (param) => fetch.get('admin/movies/searchMovie?' + queryString.stringify(param)),
})
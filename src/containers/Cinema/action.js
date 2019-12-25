import { createActions } from 'redux-actions'
import fetch from 'lib/fetch'
import queryString from 'querystring'

export const CINEMA = {
  LIST: 'LIST',
  DELETE: 'DELETE',
  DETAIL: 'DETAIL',
  CREATE: 'CREATE',
}

export default createActions({
  [CINEMA.LIST]: (param) => fetch.get('admin/cinema/list?' + queryString.stringify(param)),
  [CINEMA.DELETE]: (id) => fetch.post('admin/cinema/delete', { id }),
  [CINEMA.DETAIL]: (userId) => fetch.get('admin/cinema/detail?id=' + userId),
  [CINEMA.CREATE]: (param) => fetch.post('admin/cinema/save', param),
})
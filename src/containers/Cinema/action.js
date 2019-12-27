import { createActions } from 'redux-actions'
import fetch from 'lib/fetch'
import queryString from 'querystring'

export const CINEMA = {
  LIST: 'LIST',
  DELETE: 'DELETE',
  DETAIL: 'DETAIL',
  CREATE: 'CREATE',
  TAGS: 'TAGS',
  SUBMIT: 'SUBMIT.CINEMA',
  CINEMATAGS: 'CINEMA.TAGS',
  SUBMITTAGS: 'SUBMIT.CINEMATAG',
  CHANGESTATUS: 'CHANGESTATUS',
  TAGSLIST: 'TAGS.LIST',
  TAGSDELETE: 'TAGS.DELETE',
  TAGSINFO: 'TAGS.INFO',
  TAGSSAVE: 'TAGS.SAVE',
}

export default createActions({
  [CINEMA.LIST]: (param) => fetch.get('admin/cinema/list?' + queryString.stringify(param)),
  [CINEMA.DELETE]: (id) => fetch.post('admin/cinema/delete', { id }),
  [CINEMA.DETAIL]: (id) => fetch.get('admin/cinema/detail?id=' + id),
  [CINEMA.CINEMATAGS]: (id) => fetch.get('admin/cinema/cinemaTags?id=' + id),
  [CINEMA.TAGS]: () => fetch.get('admin/cinema/tags'),
  [CINEMA.SUBMIT]: (param) => fetch.post('admin/cinema/save', param),
  [CINEMA.CHANGESTATUS]: (param) => fetch.post('admin/cinema/changeStatus', param),
  [CINEMA.SUBMITTAGS]: (param) => fetch.post('admin/cinema/saveCinemaTags', param),
  [CINEMA.TAGSSAVE]: (param) => fetch.post('admin/cinema/saveTags', param),
  [CINEMA.TAGSLIST]: (param) => fetch.get('admin/cinema/tagsList?' + queryString.stringify(param)),
  [CINEMA.TAGSINFO]: (param) => fetch.get('admin/cinema/tagsInfo?' + queryString.stringify(param)),
  [CINEMA.TAGSDELETE]: (id) => fetch.post('admin/cinema/tagsDelete', { id }),
})
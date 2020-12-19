import { createActions } from 'redux-actions'
import fetch from 'lib/fetch'
import queryString from 'querystring'

export const VOUCHER = {
  MEMBERLIST: 'MEMBER.LIST',
  MEMBERDETAIL: 'MEMBER.DETAIL',
  MEMBERUPSERT: 'MEMBER.UPSERT',
  MOVIELIST: 'MOVIE.LIST',
  MOVIEDETAIL: 'MOVIE.DETAIL',
  MOVIEUPSERT: 'MOVIE.UPSERT',
  SNACKSLIST: 'SNACKS.LIST',
  SNACKSDETAIL: 'SNACKS.DETAIL',
  SNACKSUPSERT: 'SNACKS.UPSERT',
  ALLMEMBERTYPE: 'MEMBER.TYPES',
  VOUCHERCONFIG: 'VOUCHER.CONFIG',
}

export default createActions({
  [VOUCHER.MEMBERLIST]: (param) => fetch.get('admin/voucher/memberList?' + queryString.stringify(param)),
  [VOUCHER.MEMBERDETAIL]: (param) => fetch.get('admin/voucher/memberDetail?'+ queryString.stringify(param)),
  [VOUCHER.MEMBERUPSERT]: (param) => fetch.post('admin/voucher/memberUpsert', param),
  [VOUCHER.MOVIELIST]: (param) => fetch.get('admin/voucher/movieList?' + queryString.stringify(param)),
  [VOUCHER.MOVIEDETAIL]: (param) => fetch.get('admin/voucher/movieDetail?'+ queryString.stringify(param)),
  [VOUCHER.MOVIEUPSERT]: (param) => fetch.post('admin/voucher/movieUpsert', param),
  [VOUCHER.SNACKSLIST]: (param) => fetch.get('admin/voucher/snacksList?' + queryString.stringify(param)),
  [VOUCHER.SNACKSDETAIL]: (param) => fetch.get('admin/voucher/snacksDetail?'+ queryString.stringify(param)),
  [VOUCHER.SNACKSUPSERT]: (param) => fetch.post('admin/voucher/SnacksUpsert', param),
  [VOUCHER.ALLMEMBERTYPE]: () => fetch.get('admin/main/allMemberType'),
  [VOUCHER.VOUCHERCONFIG]: () => fetch.get('admin/voucher/config'),
})
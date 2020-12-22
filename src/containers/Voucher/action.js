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
  MEMBERCARDLIST: 'MEMBERCARD.LIST',
  MEMBERCARDDETAIL: 'MEMBERCARD.DETAIL',
  MEMBERCARDUPSERT: 'MEMBERCARD.UPSERT',
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
  [VOUCHER.SNACKSUPSERT]: (param) => fetch.post('admin/voucher/snacksUpsert', param),
  [VOUCHER.ALLMEMBERTYPE]: () => fetch.get('admin/main/allMemberCard'),
  [VOUCHER.VOUCHERCONFIG]: () => fetch.get('admin/voucher/config'),
  [VOUCHER.MEMBERCARDLIST]: (param) => fetch.get('admin/voucher/memberCardList?' + queryString.stringify(param)),
  [VOUCHER.MEMBERCARDDETAIL]: (param) => fetch.get('admin/voucher/memberCardDetail?'+ queryString.stringify(param)),
  [VOUCHER.MEMBERCARDUPSERT]: (param) => fetch.post('admin/voucher/memberCardUpsert', param),
})
// 菜单高亮 是根据路由的path进行匹配的。
// 添加新菜单，请使用如下规则
// /ruoter/subRouter?query=xxx
export default {
  menus: [{
    path: '/dashboard',
    icon: 'dashboard',
    key: 'dashboard',
    name: '数据概览'
  }, {
    path: '/cinema',
    icon: 'video-camera',
    key: 'cinema',
    name: '影院管理',
    children: [{
      path: '/cinema/list',
      key: 'cinemaList',
      name: '影院列表'
    }, {
      path: '/cinema/subscribe',
      key: 'cinemaSubscribe',
      name: '订阅通知'
    }]
  },
  // {
  //   path: '/movie',
  //   icon: 'youtube',
  //   name: '电影管理',
  //   key: 'movie',
  //   children: [{
  //     path: '/movie/list',
  //     key: 'movieList',
  //     name: '电影列表'
  //   }, {
  //     path: '/movie-scene',
  //     icon: 'scissor',
  //     key: 'movieScene',
  //     name: '场次列表'
  //   }]
  // },
  {
    path: '/order',
    icon: 'ordered-list',
    name: '订单管理',
    key: 'order',
    children: [{
      path: '/order/list',
      key: 'orderList',
      name: '订单列表'
    }]
  }, {
    path: '/voucher',
    icon: 'ordered-list',
    // icon: 'account-book-outlined',
    key: 'voucher',
    name: '优惠券管理',
    children: [{
      path: '/voucher/movieList',
      key: 'voucherMovieList',
      name: '影票抵扣列表'
    }, {
      path: '/voucher/snacksList',
      key: 'voucherSnacksList',
      name: '商品抵扣列表'
    }, {
      path: '/voucher/memberList',
      key: 'voucherMemberList',
      name: '会员兑换列表'
    }]
  }, {
    path: '/user',
    icon: 'team',
    key: 'userSetting',
    name: '用户设置'
  }, {
    path: '/setting',
    icon: 'setting',
    key: 'system',
    name: '系统设置'
  }]
}
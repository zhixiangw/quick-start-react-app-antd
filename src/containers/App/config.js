// 菜单高亮 是根据路由的path进行匹配的。
// 添加新菜单，请使用如下规则
// /ruoter/subRouter?query=xxx
export default {
  menus: [{
    path: '/dashboard',
    icon: 'dashboard',
    name: '数据概览'
  }, {
    path: '/cinema',
    icon: 'video-camera',
    name: '影院管理',
    children: [{
      path: '/cinema/list',
      name: '影院列表'
    }]
  }, {
    path: '/movie',
    icon: 'youtube',
    name: '电影管理',
    children: [{
      path: '/movie/list',
      name: '电影列表'
    }, {
      path: '/movie-scene',
      icon: 'scissor',
      name: '场次列表'
    }]
  }, {
    path: '/order',
    icon: 'ordered-list',
    name: '订单管理',
    children: [{
      path: '/order/list',
      name: '订单列表'
    }, {
      path: '/order/subscribe',
      name: '订阅通知'
    }]
  }, {
    path: '/user',
    icon: 'team',
    name: '用户设置'
  }, {
    path: '/setting',
    icon: 'setting',
    name: '系统设置'
  }]
}
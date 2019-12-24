export default {
  menus: [{
    path: '/dashboard',
    icon: 'dashboard',
    name: '数据概览'
  }, {
    path: '/cinema',
    icon: 'video-camera',
    name: '影院信息',
    children: [{
      path: '/cinema/list',
      name: '影院列表'
    }, {
      path: '/cinema/detail',
      name: '影院配置'
    }]
  }, {
    path: '/movie',
    icon: 'youtube',
    name: '电影信息'
  }, {
    path: '/movie-scene',
    icon: 'scissor',
    name: '场次信息'
  }, {
    path: '/order',
    icon: 'ordered-list',
    name: '订单信息'
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
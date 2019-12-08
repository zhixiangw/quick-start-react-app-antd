import { handleActions } from 'redux-actions'
import { ORDER } from './action'

const initState = {
  orderList: [
    {
      'id': 60,
      'user_id': 1,
      'openid': 'oFfx45GTU1gtwQrv1jWMF9Kr_KWo',
      'amount': 0.01,
      'price': 33,
      'sell_price': 28.1,
      'prepay_id': 'wx072342311861630aacff18c51705726300',
      'date': '2019-12-07',
      'order_sn': 'movie_20191272342311476305707',
      'seq_no': 201912080088977,
      'count': 3,
      'seats': [
        {
          'row': '12',
          'column': '07',
          'seat_no': '0000000000000001-12-07'
        }
      ],
      'notify_time': '2019-12-07T15:43:17.000Z',
      'pay_time': '2019-12-07T15:42:31.000Z',
      'payed_time': '2019-12-07T15:43:17.000Z',
      'created_at': '2019-12-07T15:42:31.000Z',
      'updated_at': '2019-12-08T07:14:58.000Z',
      'status': 3,
      'note': '',
      'ip': '220.112.125.151',
      'show_time': '2019-12-08 13:20:00',
      'cinema_id': 172,
      'movie_id': 1258163,
      'movie': {
        'img': 'http://p0.meituan.net/w.h/movie/dd488887e8a1c8ab4723eee4026d25aa1973142.jpg',
        'name': '利刃出鞘',
        'ename': 'Knives Out',
        'movie_id': 1258163
      },
      'ciname': {
        'name': '浙江电影院',
        'addr': '黄浦区浙江中路123号（近福州路）',
        'cinema_id': 172
      },
      'seatsText': [
        '12排07座'
      ],
      'surcharge': null,
      'surchargeText': '',
      'statusText': '待支付'
    },
    {
      'id': 59,
      'user_id': 1,
      'openid': 'oFfx45GTU1gtwQrv1jWMF9Kr_KWo',
      'amount': 0.01,
      'price': 0.51,
      'sell_price': 0.43,
      'prepay_id': 'wx07225233267822b3e7fb15a91770650000',
      'date': '2019-12-07',
      'order_sn': 'movie_201912722523313751015497',
      'seq_no': 201912080126413,
      'count': 2,
      'seats': [
        '19071'
      ],
      'notify_time': '2019-12-07T14:53:29.000Z',
      'pay_time': '2019-12-07T14:52:33.000Z',
      'payed_time': '2019-12-07T14:53:28.000Z',
      'created_at': '2019-12-07T14:52:33.000Z',
      'updated_at': '2019-12-08T07:14:56.000Z',
      'status': 2,
      'note': '',
      'ip': '220.112.125.151',
      'show_time': '2019-12-08 10:20:00',
      'cinema_id': 168,
      'movie_id': 1217125,
      'movie': {
        'img': 'http://p1.meituan.net/w.h/moviemachine/f4df6f9c2c55e347266e35027da415251124290.jpg',
        'name': '勇敢者游戏2：再战巅峰',
        'ename': 'Jumanji 2: The Next Level',
        'movie_id': 1217125
      },
      'ciname': {
        'name': 'SFC上影影城（新世界店）',
        'addr': '黄浦区南京西路2-68号新世界城12楼（靠近西藏中路）',
        'cinema_id': 168
      },
      'seatsText': [
        'undefined排undefined座'
      ],
      'surcharge': null,
      'surchargeText': '',
      'statusText': '支付失败'
    },
    {
      'id': 46,
      'user_id': 1,
      'openid': 'oFfx45GTU1gtwQrv1jWMF9Kr_KWo',
      'amount': 0.01,
      'price': 0,
      'sell_price': 0,
      'prepay_id': 'wx07154802067583e1fcdbb4ca1463775800',
      'date': '2019-12-07',
      'order_sn': 'movie_20191271548190882738062',
      'seq_no': 201912070120484,
      'count': 1,
      'seats': [
        '0000000000000001-8-04'
      ],
      'notify_time': '2019-12-07T08:52:25.000Z',
      'pay_time': '2019-12-07T07:48:02.000Z',
      'payed_time': '2019-12-07T07:48:18.000Z',
      'created_at': '2019-12-07T07:48:01.000Z',
      'updated_at': '2019-12-08T06:44:04.000Z',
      'status': 1,
      'note': '',
      'ip': '220.112.124.194',
      'show_time': '2019-12-07 18:45:00',
      'cinema_id': 228,
      'movie_id': 1217041,
      'movie': {
        'img': 'http://p1.meituan.net/w.h/movie/6d1a970c7fefb016006b0af099d8ff38867262.jpg',
        'name': '南方车站的聚会',
        'ename': 'The Wild Goose Lake',
        'movie_id': 1217041
      },
      'ciname': {
        'name': '大光明电影院（南京西路店）',
        'addr': '黄浦区南京西路216号（黄河路南京西路）',
        'cinema_id': 228
      },
      'seatsText': [
        'undefined排undefined座'
      ],
      'surcharge': null,
      'surchargeText': '',
      'statusText': '支付成功'
    }
  ],
  orderDetail: {
    'cinema': {
      'id': 41,
      'cinema_id': 228,
      'shop_id': 1796971,
      'name': '大光明电影院（南京西路店）',
      'addr': '黄浦区南京西路216号（黄河路南京西路）',
      'poster1': '',
      'poster2': '',
      'sell': true,
      'status': 1,
      'lat': 31.233,
      'lng': 121.471,
      'created_at': '2019-09-14T04:01:04.000Z',
      'updated_at': '2019-12-08T05:35:43.000Z',
      'fetchtime': '2019-12-08',
      'show_fetchtime': '2019-12-08'
    },
    'movie': {
      'id': 186,
      'movie_id': 1217041,
      'name': '南方车站的聚会',
      'ename': 'The Wild Goose Lake',
      'ver': '2D',
      'version': '',
      'cat': '剧情,犯罪',
      'img': 'http://p1.meituan.net/w.h/movie/6d1a970c7fefb016006b0af099d8ff38867262.jpg',
      'score': 8,
      'wish': 170997,
      'wishst': 0,
      'binge_watch': 8173,
      'ori_lang': '国语',
      'dur': 113,
      'star': '胡歌,桂纶镁,廖凡',
      'acts': '',
      'dra': '南方某城市，重案队长刘队（廖凡 饰）重金悬赏在逃罪犯周泽农（胡歌 饰）。陪泳女刘爱爱（桂纶镁 饰） 、周泽农曾经的好友华华（奇道 饰）、五年未见的妻子杨淑俊（万茜 饰），各色人等各怀心事，相继被卷入这场罪与罚的追击旋涡。冒险与爱情，人性与救赎，这场特别的“聚会”该如何收场？善恶有道一念之间。',
      'order': 0,
      'snum': 79684,
      'is_top': 0,
      'status': 1,
      'created_at': '2019-11-12T13:43:46.000Z',
      'updated_at': '2019-12-08T07:43:49.000Z',
      'time_cate': '正在热映',
      'src': '中国大陆',
      'dir': '刁亦男',
      'showst': 3,
      'pub_desc': '2019-12-06 08:00大陆上映',
      'rt': '2019-12-06',
      'egg': 0,
      'global_released': 1,
      'photos': [
        'http://p0.meituan.net/w.h/movie/90b8fd9e77dec0f713a47f5129d26d23701725.jpg',
        'http://p1.meituan.net/w.h/movie/12d4deae7ea7ead88975ba27bb79e9b8685225.jpg',
        'http://p1.meituan.net/w.h/movie/fb0882a361547c78dd07679ff5bc7f9b780142.jpg',
        'http://p1.meituan.net/w.h/movie/8d8cc9e40ea0d8eb7984fef711da2292753337.jpg',
        'http://p1.meituan.net/w.h/movie/017b3fc544c79e2864c3c38bb3513eb4819777.jpg',
        'http://p0.meituan.net/w.h/movie/66112819349433e8955d1b2c19b68ecd812668.jpg',
        'http://p0.meituan.net/w.h/movie/ec5091993fabc10954dd0fa9de3bd26a769533.jpg',
        'http://p0.meituan.net/w.h/movie/7b75f7e25b996d450b7115e8d2b5abcb634639.jpg',
        'http://p0.meituan.net/w.h/movie/94fed3e23bc7f53fad356a41361d672e707711.jpg',
        'http://p0.meituan.net/w.h/movie/8524fff9d8e5e9fa901c53308af3c9ae673807.jpg',
        'http://p0.meituan.net/w.h/movie/14cffd8d9a1b2b96155532aed9922ba5770805.jpg',
        'http://p0.meituan.net/w.h/movie/75c51fbf174c11abc4c05d148898a4a4855607.jpg',
        'http://p0.meituan.net/w.h/movie/e68f89c616536cb9eeba104eb0083146787506.jpg',
        'http://p0.meituan.net/w.h/movie/67d83399b3c127801be921ad0db97cde800544.jpg',
        'http://p0.meituan.net/w.h/movie/931cd0dd8a7ece42c50ebfe58210ab9b837295.jpg',
        'http://p0.meituan.net/w.h/movie/45dc107d058baeb43f075fe00278ecf2746008.jpg',
        'http://p1.meituan.net/w.h/movie/00ec6de22bc6db7ae0cdd2debf2a8969692841.jpg',
        'http://p0.meituan.net/w.h/movie/1d0f0a19984698019332cc496292e62e853927.jpg',
        'http://p1.meituan.net/w.h/movie/29aaba46e115a65b7ee3348d5ec7911d686795.jpg',
        'http://p1.meituan.net/w.h/movie/9b23349cf25b359d83dcdd541a9b85ff638811.jpg'
      ]
    },
    'order': {
      'id': 46,
      'user_id': 1,
      'openid': 'oFfx45GTU1gtwQrv1jWMF9Kr_KWo',
      'amount': 0.01,
      'price': 0,
      'sell_price': 0,
      'prepay_id': 'wx07154802067583e1fcdbb4ca1463775800',
      'date': '2019-12-07',
      'order_sn': 'movie_20191271548190882738062',
      'seq_no': 201912070120484,
      'count': 1,
      'seats': [
        '0000000000000001-8-04'
      ],
      'notify_time': '2019-12-07T08:52:25.000Z',
      'pay_time': '2019-12-07T07:48:02.000Z',
      'payed_time': '2019-12-07T07:48:18.000Z',
      'created_at': '2019-12-07T07:48:01.000Z',
      'updated_at': '2019-12-08T06:44:04.000Z',
      'status': 1,
      'note': '',
      'ip': '220.112.124.194',
      'hall': '2号厅',
      'statusText': '支付成功',
      'show_time': '2019-12-07 18:45:00',
      'seatsText': [
        'undefined排undefined座'
      ],
      'ticketing': 'http://img.alicdn.com/imgextra/i2/868938066/TB2cvFVdVXXXXcTXXXXXXXXXXXX-868938066.jpg'
    }
  }
}

export default handleActions(
  {
    [ORDER.LIST + '_FULFILLED']: (state, { payload }) => {
      console.log(payload)
      return { ...state, orderList: [] }
    }
  },
  initState
)
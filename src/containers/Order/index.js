import React from 'react'
import { Table } from 'antd';
import { connect } from 'react-redux'
import OrderAction from './action'

class Order extends React.Component {
  componentDidMount() {
    this.props.queryOrderList()
  }

  getColumns = () => {
    return [
      {
        title: '电影名称',
        dataIndex: 'movieName',
        key: 'movieName',
      },
      {
        title: '影院名称',
        dataIndex: 'cinemaName',
        key: 'cinemaName',
      },
      {
        title: '场次',
        dataIndex: 'showTime',
        key: 'showTime',
      },
      {
        title: '用户名称',
        key: 'userName',
        dataIndex: 'userName'
      },
      {
        title: '金额(元)',
        key: 'amount',
        dataIndex: 'amount'
      },
      {
        title: '下单时间',
        key: 'orderTime',
        dataIndex: 'orderTime'
      },
      {
        title: '支付时间',
        key: 'payTime',
        dataIndex: 'payTime'
      },
      {
        title: '状态',
        key: 'statusText',
        dataIndex: 'statusText'
      },
      {
        title: '操作',
        key: 'action',
        render: (action, record) => <a href={`/#/order-detail/${record.key}`}>详情</a>,
      },
    ]
  }

  getDataSource = () => {
    const { orderList = [] } = this.props
    return orderList.map(order => {
      return {
        key: order.id,
        movieName: order.movie.name,
        cinemaName: order.ciname.name,
        showTime: order.show_time,
        userName: 'w',
        amount: order.amount,
        orderTime: order.created_at,
        payTime: order.pay_time,
        statusText: order.statusText,
        action: order.id
      }
    })
  }

  render() {
    return <Table columns={this.getColumns()} dataSource={this.getDataSource()} />
  }
}


const mapStateToProps = (state) => ({
  orderList: state.OrderReducer.orderList
});
const mapDispatchToProps = dispatch => ({ queryOrderList: payload => dispatch(OrderAction.list(payload)) });
export default connect(mapStateToProps, mapDispatchToProps)(Order);

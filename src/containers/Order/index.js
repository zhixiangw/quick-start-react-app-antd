import React from 'react'
import { Table, Divider } from 'antd';
import { connect } from 'react-redux'
import SearchForm from 'components/SearchForm'
import OrderAction from './action'

class Order extends React.Component {
  componentDidMount() {
    // this.props.queryOrderList()
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

  getFields = () => {
    return [{
      label: '用户手机号',
      name: 'mobile'
    }, {
      label: '用户ID',
      name: 'user_id'
    }, {
      label: '订单ID',
      name: 'order_id'
    }, {
      label: '订单号',
      name: 'order_number'
    }, {
      label: '订单状态',
      name: 'status',
      type: 'select',
      options: [{
        name: '支付成功',
        value: '1'
      }, {
        name: '支付失败',
        value: '2'
      }, {
        name: '正在支付',
        value: '3'
      }, {
        name: '已退款',
        value: '4'
      }, {
        name: '已出票',
        value: '5'
      }]
    }]
  }

  handleSearch = (values) => {

  }

  render() {
    return (
      <React.Fragment>
        <SearchForm fields={this.getFields()} onSearch={this.handleSearch}/>
        <Divider />
        <Table columns={this.getColumns()} dataSource={this.getDataSource()} />
      </React.Fragment>
    )
  }
}


const mapStateToProps = (state) => ({
  orderList: state.OrderReducer.orderList
});
const mapDispatchToProps = dispatch => ({ queryOrderList: payload => dispatch(OrderAction.list(payload)) });
export default connect(mapStateToProps, mapDispatchToProps)(Order);

import React from 'react'
import { Table, Divider, Button } from 'antd';
import { connect } from 'react-redux'
import moment from 'moment'
import SearchForm from 'components/SearchForm'
import OrderAction from './action'

class Order extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      limit: 10,
      offset: 0,
      filter: {}
    }
  }

  componentDidMount() {
    this.getOrderList()
  }

  getOrderList = () => {
    const { offset, limit, filter } = this.state
    return this.props.queryOrderList({ offset, limit, filter: JSON.stringify(filter) })
  }

  getColumns = () => {
    return [{
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
      title: < span > 下单时间 < br /> 支付时间 </span>,
      key: 'orderTime',
      dataIndex: 'orderTime',
      render: (orderTime, record) => < span > {orderTime} < br /> {record.payTime} </span>
    },
    {
      title: '状态',
      key: 'statusText',
      dataIndex: 'statusText'
    },
    {
      title: '操作',
      key: 'action',
      render: (action, record) => {
        let disabled = false;
        if (record.status !== 1) {
          disabled = true;
        }
        return (<Button disabled={disabled} href={`/#/order/detail/${record.key}`} > 出票 </Button>)
      },
    },
    ]
  }

  getDataSource = () => {
    const { orderList = [] } = this.props
    return orderList.map(order => {
      return {
        key: order.id,
        status: order.status,
        movieName: order.movie.name,
        cinemaName: order.ciname.name,
        showTime: order.show_time,
        userName: order.user.name || '--',
        amount: order.amount,
        orderTime: order.created_at && moment(order.created_at).format('YYYY-MM-DD hh:mm:ss') || '--',
        payTime: order.pay_time && moment(order.pay_time).format('YYYY-MM-DD hh:mm:ss') || '--',
        statusText: order.statusText,
        action: order.id
      }
    })
  }

  getPagination = () => {
    const { count } = this.props
    return {
      hideOnSinglePage: true,
      pageSize: this.limit,
      total: count
    }
  }

  getFields = () => {
    return [{
      label: '用户手机号',
      name: 'phone'
    }, {
      label: '用户ID',
      name: 'user_id'
    }, {
      label: '订单ID',
      name: 'order_id'
    }, {
      label: '订单号',
      name: 'order_sn'
    }, {
      label: '订单状态',
      name: 'status',
      type: 'select',
      options: [{
        name: '支付成功',
        value: 1
      }, {
        name: '支付失败',
        value: 2
      }, {
        name: '正在支付',
        value: 3
      }, {
        name: '已退款',
        value: 4
      }, {
        name: '已出票',
        value: 5
      }]
    }]
  }

  handleSearch = (values) => {
    this.setState({ filter: values, offset: 0 }, this.getOrderList)
  }

  handleTableChange = ({ current }) => {
    const { limit } = this.state
    this.setState({ offset: (current - 1) * limit }, this.getOrderList)
  }

  render() {
    return (
      <React.Fragment >
        <SearchForm fields={this.getFields()} onSearch={this.handleSearch} />
        <Divider />
        <Table
          onChange={this.handleTableChange}
          columns={this.getColumns()}
          dataSource={this.getDataSource()}
          pagination={this.getPagination()} />
      </React.Fragment>
    )
  }
}


const mapStateToProps = (state) => ({
  orderList: state.OrderReducer.orderList,
  count: state.OrderReducer.count,
});

const mapDispatchToProps = dispatch => ({ queryOrderList: payload => dispatch(OrderAction.orderList(payload)) });
export default connect(mapStateToProps, mapDispatchToProps)(Order);
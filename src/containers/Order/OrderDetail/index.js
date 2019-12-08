import React from 'react'
import { Descriptions, Card } from 'antd';
import { connect } from 'react-redux'
import Upload from 'components/Upload'
import OrderAction from '../action'

class OrderDetail extends React.Component {
  componentDidMount() {
    this.props.queryOrderDetail()
  }

  render() {
    const { orderDetail = {} } = this.props
    const { movie = {}, cinema = {}, order = {} } = orderDetail || {}
    return (
      <React.Fragment>
        <Descriptions title="订单详情">
          <Descriptions.Item label="电影名称">{movie.name}</Descriptions.Item>
          <Descriptions.Item label="影院名称">{cinema.name}</Descriptions.Item>
          <Descriptions.Item label="场次">{order.show_time}</Descriptions.Item>
          <Descriptions.Item label="用户">{order.user_name}</Descriptions.Item>
          <Descriptions.Item label="金额">{order.amount}元</Descriptions.Item>
          <Descriptions.Item label="下单时间">{order.created_at}</Descriptions.Item>
          <Descriptions.Item label="支付时间">{order.pay_time}</Descriptions.Item>
          <Descriptions.Item label="状态">{order.statusText}</Descriptions.Item>
          <Descriptions.Item label="座位排座">{order.seatsText.join(',')}</Descriptions.Item>
          <Descriptions.Item label="总票数">{order.count}</Descriptions.Item>
        </Descriptions>
        <Card title="上传票证">
          <Upload />
        </Card>
      </React.Fragment>
    )
  }
}


const mapStateToProps = (state) => ({
  orderDetail: state.OrderReducer.orderDetail
});
const mapDispatchToProps = dispatch => ({ queryOrderDetail: payload => dispatch(OrderAction.detail(payload)) });
export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail);

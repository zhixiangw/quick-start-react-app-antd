import React from 'react'
import { Descriptions, Card, Button, Radio, Input } from 'antd';
import { connect } from 'react-redux'
import moment from 'moment'
import Upload from 'components/Upload'
import OrderAction from '../action'

class OrderDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fileList: [],
      defaultFileList: [],
      isTicket: true,
      remark: ''
    }
  }

  componentDidMount() {
    const { orderId } = this.props.match.params
    this.props.queryOrderDetail(orderId).then(() => {
      const { orderDetail = {} } = this.props
      const { order = {} } = orderDetail || {}
      const fileList = order.ticketing && JSON.parse(order.ticketing) || []
      this.setState({ isTicket: order.ticketing_status == 2 ? false : true, defaultFileList: fileList, remark: order.ticketing_remark || '' })
    })
  }

  handleFileChange = (fileList) => {
    this.setState({ fileList })
  }

  handleChange = (type, e) => {
    this.setState({
      [type]: e.target.value,
    })
  }

  onSubmitOrderTicketing = () => {
    const { orderId } = this.props.match.params
    const { fileList, remark, isTicket } = this.state
    this.props.submitOrderTicketing({ orderId, ticketing: JSON.stringify(fileList), remark, is_ticket: isTicket ? '1' : '2' })
  }

  render() {
    const { orderDetail = {} } = this.props
    const { isTicket, defaultFileList, remark } = this.state
    const { movie = {}, cinema = {}, order = {}, user = {} } = orderDetail || {}
    return (
      <React.Fragment >
        <Descriptions title="订单详情" >
          <Descriptions.Item label="影院名称">{cinema.name}</Descriptions.Item>
          <Descriptions.Item label="原价">{order.price}</Descriptions.Item>
          <Descriptions.Item label="用户">{user.name || '--'}({order.phone || '--'})</Descriptions.Item>
          <Descriptions.Item label="电影名称">{movie.name} </Descriptions.Item>
          <Descriptions.Item label="实付金额">{order.amount}</Descriptions.Item>
          <Descriptions.Item label="下单时间">{order.created_at && moment(order.created_at).format('YYYY-MM-DD HH:mm:ss') || '--'}</Descriptions.Item>
          <Descriptions.Item label="场次">{order.show_time}</Descriptions.Item>
          <Descriptions.Item label="状态">{order.statusText} </Descriptions.Item>
          <Descriptions.Item label="支付时间">{order.payed_time && moment(order.payed_time).format('YYYY-MM-DD HH:mm:ss') || '--'}</Descriptions.Item>
          <Descriptions.Item label="座位排座">{order.seatsText && order.seatsText.join(',')} （共{order.count}张）</Descriptions.Item>
          <Descriptions.Item label="出票人">{order.ticketing_user || '--'}  / {order.ticketing_time && moment(order.ticketing_time).format('YYYY-MM-DD HH:mm:ss') || '--'}</Descriptions.Item>
          <Descriptions.Item label="出票状态">
            <Radio.Group onChange={this.handleChange.bind(this, 'isTicket')} value={isTicket}>
              <Radio value={true}>成功</Radio>
              <Radio value={false}>失败</Radio>
            </Radio.Group>
          </Descriptions.Item>
        </Descriptions >
        <Card title="上传票证" extra={<Button type="primary" onClick={this.onSubmitOrderTicketing}>保存票证信息</Button>}>
          <Upload defaultFileList={defaultFileList} onChange={this.handleFileChange} />
          <Input.TextArea rows={4} onChange={this.handleChange.bind(this, 'remark')} value={remark} placeholder="备注信息" />
        </Card>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  orderDetail: state.OrderReducer.orderDetail
});
const mapDispatchToProps = dispatch => ({
  queryOrderDetail: payload => dispatch(OrderAction.orderDetail(payload)),
  submitOrderTicketing: payload => dispatch(OrderAction.orderSubmit(payload)),
});
export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail);
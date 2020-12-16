import React from 'react'
import { Descriptions, Card, Button, Radio, Input, Spin } from 'antd';
import { connect } from 'react-redux'
import moment from 'moment'
import Upload from 'components/Upload'
import fetch, { baseURL } from 'lib/fetch'
import OrderAction from '../action'
import './style.less'

class OrderDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fileList: [],
      isTicket: true,
      remark: '',
      uploading: false
    }
  }

  componentDidMount() {
    const { orderId } = this.props.match.params
    this.props.queryOrderDetail(orderId).then(() => {
      const { orderDetail = {} } = this.props
      const { order = {} } = orderDetail || {}
      let fileList = order.ticketing && JSON.parse(order.ticketing) || []
      fileList = this.getDefaultFileList(fileList)
      this.setState({ isTicket: order.ticketing_status == 2 ? false : true, fileList, remark: order.ticketing_remark || '' })
    })
  }

  getDefaultFileList = (fileList) => {
    if (Array.isArray(fileList)) {
      return fileList.map((file, index) => ({ uid: index, name: 'images', status: file ? 'done' : 'uploading', url: file }))
    }
    return []
  }

  handleFileChange = (fileList) => {
    this.setState({ fileList })
  }

  handleChange = (type, e) => {
    this.setState({
      [type]: e.target.value,
    })
  }

  handlePaste = (e) => {
    e.preventDefault()
    const data = e.clipboardData || window.clipboardData
    const items = data.items || []
    const file = items.length && items[items.length - 1] && items[items.length - 1].getAsFile() || null
    if (file) {
      const formdata = new FormData()
      formdata.append('file', file)
      this.setState({ uploading: true })
      fetch.post(`${baseURL}/admin/main/uploadImages`, formdata).then(res => {
        let { fileList } = this.state
        const ossFile = res.data.oss_urls || []
        const ossFileObj = { uid: fileList.length, name: 'images', status: 'done', url: ossFile[0] }
        fileList = fileList.concat(ossFileObj);
        this.setState({ fileList, uploading: false })
      }).catch(() => this.setState({ uploading: false }))
    }
  }

  onSubmitOrderTicketing = () => {
    const { orderId } = this.props.match.params
    const { fileList, remark, isTicket } = this.state
    const ossFileUrls = fileList.map(file => file.url || file.response && file.response.data.oss_urls[0] || '')
    const ticketing = JSON.stringify(ossFileUrls)
    this.props.submitOrderTicketing({ orderId, ticketing, remark, is_ticket: isTicket ? '1' : '2' })
  }

  render() {
    const { orderDetail = {} } = this.props
    const { isTicket, fileList, remark, uploading } = this.state
    const { movie = {}, cinema = {}, order = {}, user = {} } = orderDetail || {}
    let snacksRender = null;
    if (order.snack_voucher) {
      snacksRender = <Descriptions title="附加商品" ><Descriptions.Item label="小食品">{order.snack_note}({order.snack_voucher})</Descriptions.Item></Descriptions >;
    }

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
        {snacksRender}
        <Card title="上传票证" extra={<Button type="primary" onClick={this.onSubmitOrderTicketing}>保存票证信息</Button>}>
          <Upload fileList={fileList} onChange={this.handleFileChange} />
          <Spin spinning={uploading}>
            <Input.TextArea
              className="paste-box"
              onPasteCapture={this.handlePaste}
              onChange={e => e.preventDefault()}
              value={'可通过剪切板粘贴上传或者快捷键 ctrl + v 上传'} />
          </Spin>
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
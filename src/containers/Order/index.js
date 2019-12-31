import React from 'react'
import { Table, Divider, Button, Modal, Form, Input } from 'antd';
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
      filter: {},
      refundItem: {},
      visible: false,
      confirmLoading: false,
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
      title: 'ID',
      dataIndex: 'key',
      key: 'orderID',
    }, {
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
        const res = [];
        if (record.status !== 1) {
          res.push(<Button href={`/#/order/detail/${record.key}`} > 查看 </Button>)
        } else {
          res.push(<Button type="primary" href={`/#/order/detail/${record.key}`} > 出票 </Button>)
        }
        res.push(<Button disabled={~~record.status !== 1} type="danger" onClick={this.handleRefund.bind(this, record)} > 退款 </Button>)
        return res
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

  handleRefund = (record) => {
    this.setState({
      visible: true,
      refundItem: {
        id: record.key,
        amount: record.amount,
      }
    });
  }

  handleOk = e => {
    const form = this.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      // 加载中
      this.setState({
        confirmLoading: true,
      });
      this.props.onSubmit(values).then((res) => {
        if (res.value && res.value.code === 0) {
          this.setState({
            confirmLoading: false,
          });
          this.setState({
            confirmLoading: false,
          });
          this.getOrderList()
        }
      }).catch(e => {
        this.setState({
          confirmLoading: false,
        });
      })
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false,
      confirmLoading: false,
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form
    const { confirmLoading } = this.state

    return (
      <React.Fragment >
        <SearchForm fields={this.getFields()} onSearch={this.handleSearch} />
        <Divider />
        <Table
          onChange={this.handleTableChange}
          columns={this.getColumns()}
          dataSource={this.getDataSource()}
          pagination={this.getPagination()} />
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          confirmLoading={confirmLoading}
          okText='保存'
          cancelText='提交'
        >
          <Form>
            {getFieldDecorator('id', { initialValue: this.state.refundItem.id })(
              <Input type='hidden' />
            )}
            <Form.Item label='退款金额'>
              {getFieldDecorator('refund_amount', {
                rules: [
                  { required: true, message: '请输入退款金额', }
                ],
                initialValue: this.state.refundItem.amount,
              })(
                <Input placeholder='请输入退款金额' />
              )}
            </Form.Item>
          </Form>
        </Modal>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  orderList: state.OrderReducer.orderList,
  count: state.OrderReducer.count,
});

const mapDispatchToProps = dispatch => ({
  queryOrderList: payload => dispatch(OrderAction.orderList(payload)),
  onSubmit: payload => dispatch(OrderAction.orderRefund(payload)),
});

const WrappedNormalLoginForm = Form.create({ name: 'cinema_tags_form' })(connect(mapStateToProps, mapDispatchToProps)(Order));


export default WrappedNormalLoginForm;
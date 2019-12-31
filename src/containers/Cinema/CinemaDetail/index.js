import React from 'react'
import { Radio, Form } from 'antd';
import { connect } from 'react-redux'
import moment from 'moment'
import Action from '../action'

class cinemaDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      status: 1,
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params
    this.props.queryDetail(id).then(res => {
      if (res && res.value && res.value.data) {
        this.setState({
          status: res.value.data.status,
        });
      }
    })
  }

  onStatusChange = (e) => {
    this.setState({
      status: e.target.value,
    });
    const { id } = this.props.match.params
    Action.changestatus({ id, status: e.target.value });
  }

  render() {
    const { detail = {} } = this.props;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
    }
    return (
      <Form layout="horizontal">
        <Form.Item label="影院ID" {...formItemLayout}>
          {detail.cinema_id}
        </Form.Item>
        <Form.Item label="影院名称" {...formItemLayout}>
          {detail.name}
        </Form.Item>
        <Form.Item label="地址" {...formItemLayout}>
          {detail.addr}
        </Form.Item>
        <Form.Item label="经纬度" {...formItemLayout}>
          {detail.lat},{detail.lng}
        </Form.Item>
        <Form.Item label="创建时间" {...formItemLayout}>
          {detail.created_at && moment(detail.created_at).format('YYYY-MM-DD HH:mm:ss') || '--'}
        </Form.Item>
        <Form.Item label="更新时间" {...formItemLayout}>
          {detail.updated_at && moment(detail.updated_at).format('YYYY-MM-DD HH:mm:ss') || '--'}
        </Form.Item>
        <Form.Item label="通知标签" {...formItemLayout}>
          {detail.tags && detail.tags.join(',')}
        </Form.Item>
        <Form.Item label="天猫在售" {...formItemLayout}>
          {detail.sell ? '在售' : '禁售'}
        </Form.Item>
        <Form.Item label="状态" {...formItemLayout}>
          <Radio.Group onChange={this.onStatusChange} value={this.state.status}>
            <Radio value={1}>开启</Radio>
            <Radio value={0}>关闭</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    );
  }
}

const mapStateToProps = (state) => ({
  detail: state.CinemaReducer.detail
});
const mapDispatchToProps = dispatch => ({
  queryDetail: payload => dispatch(Action.detail(payload)),
  submit: payload => dispatch(Action.submitCinema(payload)),
});
export default connect(mapStateToProps, mapDispatchToProps)(cinemaDetail);
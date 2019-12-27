import React from 'react'
import { creatHistory, Button, Select, Input, Form, Switch } from 'antd';
import { connect } from 'react-redux'
import Action from '../action'
import UserAction from '../../User/action'

class tagsForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      originValues: [],
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params
    this.props.queryAllUser({ limit: 10000 })
    if (~~id) {
      this.props.queryTagsById({ id })
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { id } = this.props.match.params
        values.id = ~~id;
        this.props.onSubmit(values).then((res) => {
          if (res.value && res.value.code === 0) {
            setTimeout(() => {
              this.props.history.goBack();
            }, 1500);
          }
        })
      }
    });
  }

  render() {
    const { id } = this.props.match.params
    let { tagsInfo = {}, userList = [] } = this.props
    if (!~~id) {
      tagsInfo = {}
    }
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 8 },
    };
    const options = userList.map(item => (<Select.Option key={item.id} value={item.id}>{item.username}({item.id})</Select.Option>))

    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item {...formItemLayout} label="标签名">
          {getFieldDecorator('tag', {
            initialValue: tagsInfo.tag,
            rules: [
              {
                required: true,
                message: '请输入标签名(英文)',
              },
            ],
          })(<Input placeholder="请输入标签名(英文)" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="备注">
          {getFieldDecorator('note', {
            initialValue: tagsInfo.note,
            rules: [
              {
                required: true,
                message: '请输入备注',
              },
            ],
          })(<Input.TextArea rows={4} placeholder="请输入备注" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="状态">
          {getFieldDecorator('status', {
            valuePropName: 'checked',
            initialValue: !!tagsInfo.status,
          })(<Switch />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="通知用户">
          {getFieldDecorator('user_ids', {
            initialValue: tagsInfo.user_ids,
            rules: [{
              required: true,
              message: '请选择通知用户',
              type: 'array'
            }],
          })(
            <Select mode="multiple" placeholder="请选择通知用户">
              {options}
            </Select>,
          )}
        </Form.Item>
        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const mapStateToProps = (state) => ({
  tagsInfo: state.CinemaReducer.tagsInfo,
  userList: state.UserReducer.userList,
});
const mapDispatchToProps = dispatch => ({
  queryTagsById: payload => dispatch(Action.tagsInfo(payload)),
  queryAllUser: payload => dispatch(UserAction.userList(payload)),
  onSubmit: payload => dispatch(Action.tagsSave(payload)),
});

const WrappedNormalLoginForm = Form.create({ name: 'tags_form' })(connect(mapStateToProps, mapDispatchToProps)(tagsForm));

export default WrappedNormalLoginForm;
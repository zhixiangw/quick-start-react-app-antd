import React from 'react'
import { creatHistory, Button, Select, Input, Form, Switch } from 'antd';
import { connect } from 'react-redux'
import Action from '../action'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

console.log(FormList,"_+_+_+_+_+_++_+_+")
class MemberForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      originValues: []
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params
    Promise.all([
      this.props.memberTypes()
    ]).then(() => {
      if (~~id) {
        this.props.queryInfo({ id })
      }
    })
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

  filterOption = (input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0

  render() {
    const { id } = this.props.match.params
    let { info = {}} = this.props
    if (!~~id) {
      info = {}
    }
    
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 8 },
    };
    
    const sopts = this.props.allMemberType.map(item => (<Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>))

    const { getFieldDecorator } = this.props.form;
    const fields = info.data;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item {...formItemLayout} label="名称">
          {getFieldDecorator('name', {
            initialValue: info.name,
            rules: [
              {
                required: true,
                message: '请输入名称',
              },
            ],
          })(<Input placeholder="请输入名称" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="ICON">
          {getFieldDecorator('icon', {
            initialValue: info.icon,
            rules: [
              {
                required: true,
                message: '请输入ICON',
              },
            ],
          })(<Input placeholder="请输入ICON" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="兑换天数">
          {getFieldDecorator('value', {
            initialValue: info.value,
            rules: [
              {
                required: true,
                message: '请输入兑换天数',
              },
            ],
          })(<Input placeholder="请输入兑换天数" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="兑换会员类型">
          {getFieldDecorator('type_id', {
            initialValue: info.type_id,
            rules: [{
              required: true,
              message: '请选择会员类型',
              type: 'array'
            }],
          })(
            <Select placeholder="请选择" optionFilterProp="children" filterOption={this.filterOption}>
              {sopts}
            </Select>,
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="抵扣描述备注">
          {getFieldDecorator('desc', {
            initialValue: info.desc,
            rules: [
              {
                required: true,
                message: '请输入抵扣描述',
              },
            ],
          })(<Input.TextArea rows={4} placeholder="请输入抵扣描述" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="状态">
          {getFieldDecorator('status', {
            valuePropName: 'checked',
            initialValue: !!info.status,
          })(<Switch />)}
        </Form.Item>
        <Form.List name="data">
          {(fields, { add, remove }) => (
            <>
              {fields.map(field => (
                <div>
<Form.Item
                    {...field}
                    name={[field.name, 'first']}
                    fieldKey={[field.fieldKey, 'first']}
                    rules={[{ required: true, message: 'Missing first name' }]}
                  >
                    <Input placeholder="First Name" />
                  </Form.Item>
                  <Form.Item
                    {...field}
                    name={[field.name, 'last']}
                    fieldKey={[field.fieldKey, 'last']}
                    rules={[{ required: true, message: 'Missing last name' }]}
                  >
                    <Input placeholder="Last Name" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(field.name)} />
                </div> 
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  Add field
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
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
  info: state.VoucherReducer.detail,
  allMemberType: state.VoucherReducer.allMemberType,
});
const mapDispatchToProps = dispatch => ({
  memberTypes: payload => dispatch(Action.memberTypes(payload)),
  queryInfo: payload => dispatch(Action.memberDetail(payload)),
  onSubmit: payload => dispatch(Action.tagsSave(payload)),
});

const WrappedNormalLoginForm = Form.create({ name: 'vmember_form' })(connect(mapStateToProps, mapDispatchToProps)(MemberForm));

export default WrappedNormalLoginForm;
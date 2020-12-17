import React from 'react'
import { creatHistory, Button, Select, Input, Form, Switch, Icon  } from 'antd';
import { connect } from 'react-redux'
import Action from '../action'

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

  remove = k => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('data');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  };

  add = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('data');
    const nextKeys = keys.concat(id++);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  };

  render() {
    const { id } = this.props.match.params
    let { info = {}} = this.props
    if (!~~id) {
      info = {}
    }
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
      },
    };

    const sopts = this.props.allMemberType.map(item => (<Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>))

    const { getFieldDecorator, getFieldValue  } = this.props.form;
    
    getFieldDecorator('data', { initialValue: info.data || [] });
    const keys = getFieldValue('data');
    console.log(keys,"_+_+_+_+_+_+_+_+_+_+_+")
    const formItems = keys.map((value, index) => (
      <Form.Item
        {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
        label={(index === 0 ? '附赠折扣券数据' : '')}
        required={false}
        key={index}
      >
        <Form.Item style={{ display: 'inline-block' }}>
          {getFieldDecorator(`voucher[${index}][type]`, {
            initialValue: value.type,
            validateTrigger: ['onChange', 'onBlur'],
            rules: [
              {
                required: true,
                whitespace: true,
                message: "请选择券类型",
              },
            ],
          })(
            <Select placeholder="选择券类型" optionFilterProp="children" filterOption={this.filterOption}>
              <Select.Option key="1" value="1">{item.name}</Select.Option>
            </Select>,
          )}
        </Form.Item>
        <Form.Item style={{ display: 'inline-block' }}>
          {getFieldDecorator(`voucher[${index}]['id']`, {
            initialValue: value.id,
            validateTrigger: ['onChange', 'onBlur'],
            rules: [
              {
                required: true,
                whitespace: true,
                message: "请选择抵扣券",
              },
            ],
          })(<Input placeholder="选择抵扣券" />)}
        </Form.Item>
        <Form.Item style={{ display: 'inline-block' }}>
          {getFieldDecorator(`voucher[${index}]['num']`, {
            initialValue: value.num,
            validateTrigger: ['onChange', 'onBlur'],
            rules: [
              {
                required: true,
                whitespace: true,
                message: "请填写数量",
              },
            ],
          })(<Input placeholder="发放数量" />)}
        </Form.Item>
        <Form.Item style={{ display: 'inline-block' }}>
          {keys.length > 1 ? (
            <Icon
              className="dynamic-delete-button"
              type="minus-circle-o"
              onClick={() => this.remove(index)}
            />
          ) : null}
        </Form.Item>
      </Form.Item>
    ));
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
        {formItems}
        <Form.Item {...formItemLayoutWithOutLabel}>
          <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
            <Icon type="plus" /> Add field
          </Button>
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
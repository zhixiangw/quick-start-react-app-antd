import React from 'react'
import { DatePicker, Button, Select, Input, Form, Switch, Icon, InputNumber, message  } from 'antd';
import { connect } from 'react-redux'
import Action from '../action'
import moment from 'moment';

class MemberForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      originValues: [],
      voucherType: [],
      movieVoucher: [],
      snacksVoucher: [],
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params
    Promise.all([
      this.props.voucherConfig(),
      this.props.memberTypes(),
    ]).then(([config={}]) => {
      if (~~id) {
        this.props.queryInfo({ id })
      }
      const {
        movieVoucher = [],
        voucherType = [],
        snacksVoucher = []
      } = config.value.data;
      this.state.voucherType = voucherType;
      this.state.movieVoucher = movieVoucher;
      this.state.snacksVoucher = snacksVoucher;
    })
  }

  handleTypeChange(index, value){
    const { form } = this.props;
    const data = form.getFieldValue('data');
    data[index].type = value;
    form.setFieldsValue({
      data,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log(values,err);
      if (!err) {
        const { id } = this.props.match.params
        const postData = {
          ...values,
          id: ~~id,
          data: values.voucher,
          expire_date: values.expire_date.format("YYYY-MM-DD")
        }
        delete postData.voucher;
        this.props.onSubmit(postData).then((res) => {
          if (res.value && res.value.code === 0) {
            message.success('保存成功');
            setTimeout(() => {
              this.props.history.goBack();
            }, 1500);
          } else {
            message.error(`保存失败[${res.value.message}]`);
          }
        })
      }
    });
  }

  filterOption = (input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0

  remove = k => {
    const { form } = this.props;
    const keys = form.getFieldValue('data');
    keys.splice(k, 1);
    form.setFieldsValue({
      data: keys,
    });
  };

  add = () => {
    const { form } = this.props;
    const keys = form.getFieldValue('data');
    keys.push({
      id: 1,
      type: 1,
      num: 1
    });
    form.setFieldsValue({
      data: keys,
    });
  };

  render() {
    const { id } = this.props.match.params
    let { info = {}, allMemberType} = this.props
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

    const sopts = allMemberType.map(item => (<Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>));
    
    const voucherTypeOpts = this.state.voucherType.map(item => (<Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>));
    const movieVoucherOpts = this.state.movieVoucher.map(item => (<Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>));
    const snacksVoucherOpts = this.state.snacksVoucher.map(item => (<Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>));

    const { getFieldDecorator, getFieldValue  } = this.props.form;
    
    getFieldDecorator('data', { initialValue: info.data || [] });
    const keys = getFieldValue('data');

    const formItems = keys.map((value, index) =>{
      let renderOtp;
      if(~~value.type === 1) {
        renderOtp = movieVoucherOpts;
      } else {
        renderOtp = snacksVoucherOpts;
      }

      return (
        <Form.Item
          {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
          label={(index === 0 ? '附赠折扣券数据' : '')}
          required={false}
          key={index}
        >
          <Form.Item style={{ display: 'inline-block' }}>
            {getFieldDecorator(`voucher[${index}][type]`, {
              initialValue: ~~value.type,
              validateTrigger: ['onChange', 'onBlur'],
              rules: [
                {
                  required: true,
                  type: 'integer', 
                  message: "请选择券类型",
                },
              ],
            })(
              <Select placeholder="选择券类型" optionFilterProp="children" filterOption={this.filterOption}        
              onChange={this.handleTypeChange.bind(this, index)}
              >
                {voucherTypeOpts}
              </Select>
            )}
          </Form.Item>
          <Form.Item style={{ display: 'inline-block' }}>
            {getFieldDecorator(`voucher[${index}]['id']`, {
              initialValue: value.id,
              validateTrigger: ['onChange', 'onBlur'],
              rules: [
                {
                  required: true,
                  type: 'integer', 
                  message: "请选择抵扣券",
                },
              ],
            })(
              <Select placeholder="选择券类型" optionFilterProp="children" filterOption={this.filterOption}>
                {renderOtp}
              </Select>
            )}
          </Form.Item>
          <Form.Item style={{ display: 'inline-block' }}>
            {getFieldDecorator(`voucher[${index}]['num']`, {
              initialValue: `${value.num}`,
              validateTrigger: ['onChange', 'onBlur'],
              rules: [
                {
                  required: true,
                  type: 'string', 
                  message: "请填写数量",
                },
              ],
            })(<InputNumber min={1} placeholder="发放数量" />)}
          </Form.Item>
          <Form.Item style={{ display: 'inline-block' }}>
              <Icon
                className="dynamic-delete-button"
                type="minus-circle-o"
                onClick={() => this.remove(index)}
              />
          </Form.Item>
        </Form.Item>
      )
    });
    
    const expireDate = moment(info.expire_date);
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
          })(<InputNumber min={1} placeholder="请输入兑换天数" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="过期时间">
        {getFieldDecorator('expire_date', {
            initialValue: expireDate,
            rules: [{
              type: 'object', 
              required: true, 
              message: '请选择过期时间' 
            }]
           })(<DatePicker />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="兑换会员类型">
          {getFieldDecorator('type_id', {
            initialValue: info.type_id,
            rules: [{
              required: true,
              message: '请选择会员类型',
              type: 'integer'
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
            <Icon type="plus" /> 添加附赠折扣券
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
  voucherConfig: payload => dispatch(Action.voucherConfig(payload)),
  queryInfo: payload => dispatch(Action.memberDetail(payload)),
  onSubmit: payload => dispatch(Action.memberUpsert(payload)),
});

const WrappedNormalLoginForm = Form.create({ name: 'vmember_form' })(connect(mapStateToProps, mapDispatchToProps)(MemberForm));

export default WrappedNormalLoginForm;
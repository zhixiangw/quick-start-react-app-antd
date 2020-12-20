import React from 'react'
import { DatePicker, Button, Select, Input, Form, Switch, Icon, InputNumber, message  } from 'antd';
import { connect } from 'react-redux'
import Action from '../action'
import cinameAction from '../../Cinema/action'
import moment from 'moment';

class MovieForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      originValues: [],
      cinemaTags: [],
      voucherMatchType: [],
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params
    Promise.all([
      this.props.voucherConfig(),
      this.props.queryTags(),
    ]).then(([config={}, tags = {}]) => {
      if (~~id) {
        this.props.queryInfo({ id })
      }
      console.log()
      const {
        voucherMatchType = [],
      } = config.value.data;
      const {
        data: tagsItems=[]
      } = tags.value;
      this.state.voucherMatchType = voucherMatchType;
      this.state.cinemaTags = tagsItems;
    })
  }

  handleTypeChange(value){
    const { form } = this.props;
    form.setFieldsValue({
      type: value,
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

  render() {
    const { id } = this.props.match.params
    let { info = {}, allMemberType, tagsList } = this.props
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
    
    const sopts = this.state.voucherMatchType.map(item => (<Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>));
    const { getFieldDecorator  } = this.props.form;
console.log(this.state.cinemaTags)
    // 匹配类型
    const matchField = null;
    if(info.type === 2) {
      // 影院tag匹配
      matchField = (<Form.Item {...formItemLayout} label="选择影院TAG">
      {getFieldDecorator('data.tags', {
        initialValue: info.voucher_expire,
        rules: [
          {
            required: true,
            message: '请选择影院TAG',
          },
        ],
      })(<Select placeholder="请选择" optionFilterProp="children" 
      filterOption={this.filterOption}     
      onChange={this.handleTypeChange}
      >
        {sopts}
      </Select>)}
    </Form.Item>);
    }
    
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
        <Form.Item {...formItemLayout} label="有效时间(天)">
          {getFieldDecorator('voucher_expire', {
            initialValue: info.voucher_expire,
            rules: [
              {
                required: true,
                message: '请输入有效时间',
              },
            ],
          })(<InputNumber min={1} placeholder="请输入有效时间" />)}
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
        <Form.Item {...formItemLayout} label="匹配条件">
          {getFieldDecorator('type', {
            initialValue: info.type,
            rules: [{
              required: true,
              message: '请选择匹配条件',
              type: 'integer'
            }],
          })(
            <Select placeholder="请选择" optionFilterProp="children" 
            filterOption={this.filterOption}     
            onChange={this.handleTypeChange}
            >
              {sopts}
            </Select>
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
  queryTags: payload => dispatch(cinameAction.tags(payload)),
  voucherConfig: payload => dispatch(Action.voucherConfig(payload)),
  queryInfo: payload => dispatch(Action.movieDetail(payload)),
  onSubmit: payload => dispatch(Action.movieUpsert(payload)),
});

const WrappedNormalLoginForm = Form.create({ name: 'vmovie_form' })(connect(mapStateToProps, mapDispatchToProps)(MovieForm));

export default WrappedNormalLoginForm;
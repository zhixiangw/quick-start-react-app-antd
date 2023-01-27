import React from 'react';
import {
  DatePicker,
  Button,
  Select,
  Input,
  Form,
  Switch,
  Icon,
  InputNumber,
  message,
  Upload,
} from 'antd';
import { connect } from 'react-redux';
import Action from '../action';
import moment from 'moment';
import { baseURL } from 'lib/fetch';

class ExportMovVourcherForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      memberVoucher: [],
    };
  }

  componentDidMount() {
    this.props.queryAllMVoucher().then((res) => {
      this.setState({
        memberVoucher: res.value.data.items,
      });
    });
  }

  handleTypeChange(index, value) {
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
      if (!err) {
        const postData = {
          ...values,
          // expireDate: values.expireDate.format('YYYY-MM-DD'),
        };
        this.setState({ loading: true });
        this.props.onSubmit(postData).then((res) => {
          this.setState({ loading: false });
          if (res.value && res.value.code === 0) {
            window.open(res.value.data.fileUrl);
          } else {
            message.error(`导出失败[${res.value.message}]`);
          }
        });
      }
    });
  };

  filterOption = (input, option) =>
    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;

  render() {
    const { getFieldDecorator } = this.props.form;
    const { loading, memberVoucher } = this.state;
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

    const sopts = memberVoucher.map((item) => (
      <Select.Option key={item.id} value={item.id}>
        {item.name}
      </Select.Option>
    ));
    return (
      <Form onSubmit={this.handleSubmit} className='login-form'>
        <Form.Item {...formItemLayout} label='兑换影片卡'>
          {getFieldDecorator('movieVourId', {
            rules: [
              {
                required: true,
                message: '请选择影片卡',
                type: 'integer',
              },
            ],
          })(
            <Select
              placeholder='请选择'
              optionFilterProp='children'
              filterOption={this.filterOption}
            >
              {sopts}
            </Select>
          )}
        </Form.Item>
        {/* <Form.Item {...formItemLayout} label='过期时间'>
          {getFieldDecorator('expireDate', {
            rules: [
              {
                type: 'object',
                required: true,
                message: '请选择过期时间',
              },
            ],
          })(<DatePicker />)}
        </Form.Item> */}
        <Form.Item {...formItemLayout} label='兑换数量'>
          {getFieldDecorator('num', {
            rules: [
              {
                required: true,
                message: '请输入兑换数量',
              },
            ],
          })(<InputNumber min={1} placeholder='请输入兑换数量' />)}
        </Form.Item>
        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Button type='primary' htmlType='submit' loading={loading}>
            提交
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const mapStateToProps = (state) => ({
  allMemberType: state.VoucherReducer.allMemberType,
});
const mapDispatchToProps = (dispatch) => ({
  queryAllMVoucher: (payload) => dispatch(Action.movieList(payload)),
  onSubmit: (payload) => dispatch(Action.exportMovie(payload)),
});

const WrappedNormalLoginForm = Form.create({ name: 'vexportMovVoucher_form' })(
  connect(mapStateToProps, mapDispatchToProps)(ExportMovVourcherForm)
);

export default WrappedNormalLoginForm;

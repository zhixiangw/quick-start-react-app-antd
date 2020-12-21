import React from 'react'
import moment from 'moment';
import { DatePicker, Button, Select, Input, Form, Switch, Icon, InputNumber, message, Upload  } from 'antd';
import { connect } from 'react-redux'
import Action from '../action'
import cinameAction from '../../Cinema/action'
import movieAction from '../../Movie/action'
import { baseURL } from 'lib/fetch'

class MembercardForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fileList: [],
      originValues: [],
      distcounts: [],
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params
    this.props.queryAllDiscount().then(res=>{
      const {
        items = [],
      } = res.value.data;
      this.setState({ distcounts:items });
      if (~~id) {
        this.props.queryInfo({ id }).then(res=>{
          // icon
          const { data: info={} } = res.value;
          let fileList = [];
          if(info.icon) {
            const arr = info.icon.split ('/');
            fileList = [{
              uid: '-1',
              name: arr.pop(),
              status: 'done',
              url: info.icon,
              thumbUrl: info.icon,
            }];
            this.setState({ fileList });
          }
        })
      }
    })
  }

  handleTypeChange(value){
    const { info = {}, form } = this.props;
    info.type = value;
  }

  handleValueTypeChange(value){
    const { info = {} } = this.props;
    if(!info.data) {
      info.data = {};
    }
    info.data.type = value;
  }

  handleSearch(value){
    if (value) {
      if(this.timeout !== null) {
        clearTimeout(this.timeout);
      }
      this.timeout = setTimeout(() => this.props.searchMovies({
        filter: JSON.stringify({
          name: value
        }) 
      }), 800);
    } else {
      this.setState({ data: [] });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { id } = this.props.match.params;
        let icon = values.icon[0]['url'];
        if(!icon) {
          icon = values.icon[0]['response']['data']['oss_urls'][0];
        }
        const postData = {
          ...values,
          icon,
          id: ~~id,
        }
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

  normFile = e => {
    if (Array.isArray(e)) {
      return e;
    }
    if(e && e.fileList) {
      let fileList = [...e.fileList];
      fileList = fileList.slice(-1);
      this.setState({ fileList });
      return fileList;
    }
  };

  filterOption = (input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;

  render() {
    const { id } = this.props.match.params
    let { info = {}, form } = this.props;
    const { getFieldDecorator  } = form;
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
    
    // 匹配类型
    const sopts = this.state.distcounts.map(item => (<Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>));
    
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
        <Form.Item {...formItemLayout}  label="ICON">
          {getFieldDecorator('icon', {
            initialValue: this.state.fileList,
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
            rules: [
              {
                required: true,
                message: '请上传ICON',
              },
            ],
          })(
            <Upload 
            action={`${baseURL}/admin/main/uploadImages`}
            accept="image/*"
            name="images"
            listType="picture-card"
            withCredentials={Boolean(1)}
            >
              <Button>
                <Icon type="upload" />
                上传图片
                </Button>
            </Upload>
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="说明">
          {getFieldDecorator('desc', {
            initialValue: info.desc,
            rules: [
              {
                required: true,
                message: '请输入说明',
              },
            ],
          })(<Input.TextArea rows={4} placeholder="请输入说明" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="卡展示备注">
          {getFieldDecorator('note', {
            initialValue: info.note,
            rules: [
              {
                required: true,
                message: '请输入备注',
              },
            ],
          })(<Input.TextArea rows={4} placeholder="请输入备注" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="选择折扣">
          {getFieldDecorator('preferential', {
            initialValue: info.preferential,
            rules: [{
              required: true,
              message: '请选择折扣',
              type: 'integer'
            }],
          })(
            <Select placeholder="请选择" optionFilterProp="children" 
            filterOption={this.filterOption}     
            >
              {sopts}
            </Select>
          )}
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
  searchItems: state.MoviesReducer.searchItems
});
const mapDispatchToProps = dispatch => ({
  queryAllDiscount: payload => dispatch(Action.allDiscount(payload)),
  queryInfo: payload => dispatch(Action.membercardDetail(payload)),
  onSubmit: payload => dispatch(Action.membercardUpsert(payload)),
});

const WrappedNormalLoginForm = Form.create({ name: 'membercard_form' })(connect(mapStateToProps, mapDispatchToProps)(MembercardForm));

export default WrappedNormalLoginForm;
import React from 'react'
import { Button, Select, Input, Form, Switch, Icon, message, Upload, InputNumber } from 'antd';
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
      cinemaTags: [],
      movies: [],
      valueMatchType: [],
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
      const {
        voucherMatchType = [],
        valueMatchType = [],
      } = config.value.data;
      const {
        data: tagsItems= []
      } = tags.value;
      this.setState({
        voucherMatchType,
        valueMatchType,
        cinemaTags: tagsItems,
      });
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
    
    // 券面抵扣类型
    const valueTypeOpts = this.state.valueMatchType.map(item => (<Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>));

    // 券面类型值
    let valueMatchField = null;
    if(info.data) {
      if(info.data.type === 2) {
        valueMatchField = (<Form.Item {...formItemLayout} label="折扣值">
        {getFieldDecorator('data["value"]', {
          initialValue: info.data && info.data.value,
          rules: [
            {
              required: true,
              message: '请输入折扣值',
            },
          ],
        })(<InputNumber min={1} max={1000} placeholder="折扣值,大于1，抵扣xxx元" />)}
      </Form.Item>);
      } else if(info.data.type === 3) {
        valueMatchField = (<Form.Item {...formItemLayout} label="折扣值">
        {getFieldDecorator('data["value"]', {
          initialValue: info.data && info.data.value,
          rules: [
            {
              required: true,
              message: '请输入折扣值',
            },
          ],
        })(<InputNumber min={0} max={1} placeholder="折扣值,小于1,八折=0.8" />)}
      </Form.Item>);
      }
    }
    
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
        <Form.Item {...formItemLayout} label="级别">
        {getFieldDecorator('level', {
          initialValue: info.level,
          rules: [
            {
              required: true,
              message: '请输入折扣值',
            },
          ],
        })(<InputNumber min={1} max={1000} placeholder="级别越大优先级越高" />)}
      </Form.Item>
        <Form.Item {...formItemLayout} label="折扣类型">
          {getFieldDecorator('data["type"]', {
            initialValue: info.data && info.data.type,
            rules: [{
              required: true,
              message: '请选择折扣类型',
              type: 'integer'
            }],
          })(
            <Select placeholder="请选择" optionFilterProp="children" 
            filterOption={this.filterOption}     
            onChange={this.handleValueTypeChange.bind(this)}
            >
              {valueTypeOpts}
            </Select>
          )}
        </Form.Item>
        {valueMatchField}
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
  queryTags: payload => dispatch(cinameAction.tags(payload)),
  searchMovies: payload => dispatch(movieAction.moviesSearch(payload)),
  voucherConfig: payload => dispatch(Action.voucherConfig(payload)),
  queryInfo: payload => dispatch(Action.membercardDetail(payload)),
  onSubmit: payload => dispatch(Action.membercardUpsert(payload)),
});

const WrappedNormalLoginForm = Form.create({ name: 'membercard_form' })(connect(mapStateToProps, mapDispatchToProps)(MembercardForm));

export default WrappedNormalLoginForm;
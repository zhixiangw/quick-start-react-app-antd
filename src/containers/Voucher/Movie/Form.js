import React from 'react'
import moment from 'moment';
import { DatePicker, Button, Select, Input, Form, Switch, Icon, InputNumber, message, Upload  } from 'antd';
import { connect } from 'react-redux'
import Action from '../action'
import cinameAction from '../../Cinema/action'
import movieAction from '../../Movie/action'
import { baseURL } from 'lib/fetch'

class MovieForm extends React.Component {
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
          data: values.data || {},
          expire_date: values.expire_date.format("YYYY-MM-DD")
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

  filterOption = (input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0

  render() {
    let { info = {}, form } = this.props;
    const { getFieldDecorator  } = form;
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
    const sopts = this.state.voucherMatchType.map(item => (<Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>));
    // 券面抵扣类型
    const valueTypeOpts = this.state.valueMatchType.map(item => (<Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>));
    // 匹配类型
    let matchField = null;
    if(info.type === 2) {
      // 影院tag匹配
      const tagsOpt = this.state.cinemaTags.map(item => (<Select.Option key={item.id} value={item.id}>{item.tag}</Select.Option>));
      matchField = (<Form.Item {...formItemLayout} label="选择影院TAG">
      {getFieldDecorator('data["cinameTags"]', {
        initialValue: info.data.cinameTags,
        rules: [
          {
            required: true,
            message: '请选择影院TAG',
          },
        ],
      })(<Select placeholder="请选择" 
      mode="multiple"
      showSearch
      optionFilterProp="children" 
      filterOption={this.filterOption}    
      >
        {tagsOpt}
      </Select>)}
    </Form.Item>);
    } else if(info.type === 3) {
      // 根据电影ID
      const moviesOpt = this.props.searchItems.map(item => (<Select.Option key={item.movie_id} value={item.movie_id}>{item.name}</Select.Option>));
      matchField = (<Form.Item {...formItemLayout} label="选择电影">
      {getFieldDecorator('data["movieIds"]', {
        initialValue: info.data.movieIds,
        rules: [
          {
            required: true,
            message: '请选择电影',
          },
        ],
      })(<Select placeholder="请选择" 
      mode="multiple"
      showSearch
      defaultActiveFirstOption={false}
      showArrow={false}
      filterOption={false}
      optionFilterProp="children"
      onSearch={this.handleSearch.bind(this)}
      >
        {moviesOpt}
      </Select>)}
    </Form.Item>);
    }

    // 券面类型值
    let valueMatchField = null;
    if(info.data) {
      if(info.data.type === 2) {
        valueMatchField = (<Form.Item {...formItemLayout} label="券面值">
        {getFieldDecorator('data["value"]', {
          initialValue: info.data && info.data.value,
          rules: [
            {
              required: true,
              message: '请输入券面值',
            },
          ],
        })(<InputNumber min={1} max={1000} placeholder="券面值,大于1，抵扣xxx元" />)}
      </Form.Item>);
      } else if(info.data.type === 3) {
        valueMatchField = (<Form.Item {...formItemLayout} label="券面值">
        {getFieldDecorator('data["value"]', {
          initialValue: info.data && info.data.value,
          rules: [
            {
              required: true,
              message: '请输入券面值',
            },
          ],
        })(<InputNumber min={0} max={1} placeholder="券面值,小于1,八折=0.8" />)}
      </Form.Item>);
      }
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
        <Form.Item {...formItemLayout} label="券有效期(天)">
          {getFieldDecorator('voucher_expire', {
            initialValue: info.voucher_expire,
            rules: [
              {
                required: true,
                message: '请输入有效期',
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
            onChange={this.handleTypeChange.bind(this)}
            >
              {sopts}
            </Select>
          )}
        </Form.Item>
        {matchField}
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
        <Form.Item {...formItemLayout} label="券面抵扣类型">
          {getFieldDecorator('data["type"]', {
            initialValue: info.data && info.data.type,
            rules: [{
              required: true,
              message: '请选择券面抵扣类型',
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
  queryInfo: payload => dispatch(Action.movieDetail(payload)),
  onSubmit: payload => dispatch(Action.movieUpsert(payload)),
});

const WrappedNormalLoginForm = Form.create({ name: 'vmovie_form' })(connect(mapStateToProps, mapDispatchToProps)(MovieForm));

export default WrappedNormalLoginForm;
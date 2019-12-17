
import React from 'react'
import { Form, Button, Input, Switch, Select, Upload, Icon } from 'antd';
import { baseURL } from 'lib/fetch'

class CreateUserForm extends React.Component {
  state = {
    confirmDirty: false,
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('俩次输入密码不一致!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        delete values.confirm
        values.avatar = values.avatar[0].response.data.oss_urls[0]
        values.roles = values.roles.join(',')
        values.status = values.status ? '1' : '0'
        this.props.onSubmit(values)
      }
    });
  };

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label='用户昵称'>
          {getFieldDecorator('nickname', {
            rules: [{ required: true, message: '请输入昵称!', whitespace: true }],
          })(<Input placeholder="请输入用户昵称"/>)}
        </Form.Item>
        <Form.Item label='用户头像'>
          {getFieldDecorator('avatar', {
            valuePropName: 'fileList',
            getValueFromEvent: e => {
              if (Array.isArray(e)) {
                return e;
              }
              return e && e.fileList;
            },
            rules: [{ required: true, message: '请上传用户头像!' }],
          })(<Upload
            action={`${baseURL}/admin/main/uploadImages`}
            listType="picture-card"
            accept="image/*"
            name="images"
            withCredentials={Boolean(1)}>
              {getFieldValue('avatar')[0] ? null :
              <div>
                <Icon type="plus" />
                <div className="ant-upload-text">点击上传</div>
              </div>}
          </Upload>)}
        </Form.Item>
        <Form.Item label='登录账号'>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入登录账号!', whitespace: true }],
          })(<Input placeholder="请输入登录账号"/>)}
        </Form.Item>
        <Form.Item label="登录密码" hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: '请输入登录密码!',
              },
              {
                validator: this.validateToNextPassword,
              },
            ],
          })(<Input.Password placeholder="请输入登录密码" />)}
        </Form.Item>
        <Form.Item label="确认密码" hasFeedback>
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: '请输入确认的密码!',
              },
              {
                validator: this.compareToFirstPassword,
              },
            ],
          })(<Input.Password onBlur={this.handleConfirmBlur} />)}
        </Form.Item>
        <Form.Item label='OpenId'>
          {getFieldDecorator('openid', {
            rules: [{ required: true, message: '请输入OpenId!', whitespace: true }],
          })(<Input placeholder="请输入OpenId" />)}
        </Form.Item>
        <Form.Item label="手机号码">
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: '请输入手机号码!' }],
          })(<Input placeholder="请输入手机号码" />)}
        </Form.Item>
        <Form.Item label="角色">
          {getFieldDecorator('roles', {
            rules: [
              { required: true, message: '请选择角色!', type: 'array' },
            ],
          })(
            <Select mode="multiple" placeholder="请选择角色!">
              <Select.Option value="superadmin">超级管理员</Select.Option>
              <Select.Option value="admin">管理员</Select.Option>
              <Select.Option value="manage">经理</Select.Option>
            </Select>,
          )}
        </Form.Item>
        <Form.Item label="是否启用">
          {getFieldDecorator('status', { valuePropName: 'checked' })(<Switch />)}
        </Form.Item>
        <Form.Item label="备注">
          {getFieldDecorator('remark')(
          <Input.TextArea
            placeholder="请输入备注信息"
            autosize={{ minRows: 3, maxRows: 5 }}/>)}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedCreateUserForm = Form.create({
  name: 'createuser',
  mapPropsToFields: ({ detail }) => {
    return {
      nickname: Form.createFormField({ value: detail.name }),
      avatar: Form.createFormField({ value: detail.avatar ? [{
        uid: -1,
        url: detail.avatar
      }] : [] }),
      username: Form.createFormField({ value: detail.username }),
      password: Form.createFormField({ value: detail.password }),
      openid: Form.createFormField({ value: detail.openid }),
      phone: Form.createFormField({ value: detail.phone }),
      roles: Form.createFormField({ value: detail.roles }),
      status: Form.createFormField({ value: Boolean(detail.status) }),
    }
  }
})(CreateUserForm);

export default WrappedCreateUserForm
import React from 'react'
import { Card, Divider, Icon, Avatar, Modal, Input, message } from 'antd';
import { connect } from 'react-redux'
import SearchForm from 'components/SearchForm'
import UserAction from './action'

const { Meta } = Card;

class User extends React.Component {

  state = {
    nickname: '',
    password: ''
  }

  getUserList = () => {
    const { nickname } = this.state
    return this.props.queryUserList({ nickname })
  }

  getFields = () => {
    return [{
      label: '用户名称',
      name: 'nickname',
      rules: [{
        required: true,
        message: '请输入用户名称'
      }]
    }]
  }

  handleSearch = (values) => {
    this.setState({ ...values }, this.getUserList)
  }

  onPasswordRest = (id) => {
    id = String(id)
    Modal.confirm({
      title: '是否重置此用户的密码?',
      content: <Input placeholder="请输入新密码" onChange={(e) => this.setState({ password: e.target.value })}/>,
      onOk: () => {
        const { password } = this.state
        if (password) {
          return new Promise((resolve, reject) => {
            this.props.passwordRest({ id, password }).then(resolve, reject)
          });
        } else {
          message.error('请输入密码')
          return Promise.reject('请输入密码');
        }
      },
    })
  }

  onDeleteUser = (id) => {
    id = String(id)
    Modal.confirm({
      title: '是否确定要删除这位用户?',
      content: '此操作不可逆，请谨慎考虑后，再操作！',
      okType: 'danger',
      onOk: () => {
        return new Promise((resolve, reject) => {
          this.props.deleteUser(id).then(resolve, reject)
        });
      },
    })
  }

  renderMeta = (item = {}) => {
    return (
      <Meta
        avatar={<Avatar src={item.avatar} />}
        title={item.nickname || '--'} />
    )
  }

  renderCardItem = (item = {}) => {
    return (
      <Card
        key={item.id}
        style={{ width: 300, marginTop: 16 }}
        actions={[
          <a key="edit" onClick={this.onPasswordRest.bind(this, item.id)}><Icon type="edit" />&nbsp;重置密码</a>,
          <a key="delete" onClick={this.onDeleteUser.bind(this, item.id)}><Icon type="delete" />&nbsp;删除用户</a>,
        ]}>
        {this.renderMeta(item)}
      </Card>
    )
  }

  renderUserList = () => {
    const { userList } = this.props
    return userList.map(this.renderCardItem)
  }


  render() {
    return (
      <React.Fragment>
        <SearchForm fields={this.getFields()} onSearch={this.handleSearch} />
        <Divider />
        {this.renderUserList()}
      </React.Fragment>
    )
  }
}


const mapStateToProps = (state) => ({
  userList: state.UserReducer.userList
});
const mapDispatchToProps = dispatch => ({
  queryUserList: payload => dispatch(UserAction.list(payload)),
  deleteUser: id => dispatch(UserAction.delete(id)),
  passwordRest: payload => dispatch(UserAction.reset(payload)),
});
export default connect(mapStateToProps, mapDispatchToProps)(User);

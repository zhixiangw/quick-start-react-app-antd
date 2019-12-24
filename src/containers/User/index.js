import React from 'react'
import { Divider, Table, Input, Avatar, Modal, Button, Icon } from 'antd';
import { connect } from 'react-redux'
import SearchForm from 'components/SearchForm'
import UserAction from './action'
import moment from 'moment';

class UserList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      limit: 10,
      offset: 0,
      filter: {}
    }
  }

  componentDidMount() {
    this.getUserList()
  }

  getUserList = () => {
    const { offset, limit, filter } = this.state
    return this.props.queryUserList({ offset, limit, filter: JSON.stringify(filter) })
  }

  getColumns = () => {
    return [
      {
        title: '头像',
        dataIndex: 'avatar',
        key: 'avatar',
        render: (avatar) => <Avatar src={avatar}/>
      },
      {
        title: '昵称',
        dataIndex: 'nickName',
        key: 'nickName',
      },
      {
        title: '手机号码',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: '账号',
        key: 'userName',
        dataIndex: 'userName'
      },
      {
        title: '角色',
        key: 'roles',
        dataIndex: 'roles'
      },
      {
        title: '创建时间',
        key: 'createdAt',
        dataIndex: 'createdAt'
      },
      {
        title: '状态',
        key: 'status',
        dataIndex: 'status',
      },
      {
        title: '操作',
        key: 'action',
        render: (action, record) => {
          return (
            <span>
              <a href={`/#/user/detail/${record.key}`}>编辑</a>
              <Divider type="vertical"/>
              <a onClick={this.handleDelete.bind(this, record.key)}>删除</a>
              <Divider type="vertical"/>
              <a onClick={this.handleResetPassword.bind(this, record.key)}>重置密码</a>
            </span>
          )
        },
      },
    ]
  }

  getDataSource = () => {
    const { userList = [] } = this.props
    return userList.map(user => {
      return {
        key: user.id,
        avatar: user.avatar,
        nickName: user.nickname || '--',
        phone: user.phone,
        userName: user.username,
        roles: user.roles && user.roles.join(',') || '--',
        createdAt: user.created_at && moment(user.created_at).format('YYYY-MM-DD hh:mm:ss') || '--',
        status: user.status ? '可用' : '禁用',
        action: user.id
      }
    })
  }

  getPagination = () => {
    const { count } = this.props
    return {
      hideOnSinglePage: true,
      pageSize: this.limit,
      total: count
    }
  }

  getFields = () => {
    return [{
      label: '手机号码',
      name: 'phone'
    }, {
      label: '账号',
      name: 'username'
    }]
  }

  handleDelete = (id) => {
    Modal.confirm({
      title: '是否确定删除此用户？',
      content: '此操作不可逆，请三思后行！',
      okType: 'danger',
      onOk: () => {
        return new Promise((resolve, reject) => {
          this.props.deleteUser(id).then(() => {
            this.getUserList()
            resolve()
          }, reject)
        });
      },
    })
  }

  handleResetPassword = (id) => {
    Modal.confirm({
      title: '是否重置此用户密码?',
      content: <Input placeholder="请输入重置的新密码" onChange={(e) => this.setState({ password: e.target.value })}/>,
      onOk: () => {
        const { password } = this.state
        if (password) {
          return new Promise((resolve, reject) => {
            this.props.passwordRest({ password, id: String(id) }).then(resolve, reject)
          });
        } else {
          message.error('请输入密码')
          return Promise.reject('请输入密码');
        }
      },
    })
  }

  handleSearch = (values) => {
    this.setState({ filter: values, offset: 0 }, this.getUserList)
  }

  handleTableChange = ({ current }) => {
    const { limit } = this.state
    this.setState({ offset: current * limit }, this.getUserList)
  }

  render() {
    return (
      <React.Fragment>
        <Button type="primary" onClick={() => this.props.history.push('/user/detail/0')}><Icon type="plus"/>新增管理员</Button>
        <Divider />
        <SearchForm fields={this.getFields()} onSearch={this.handleSearch}/>
        <Divider />
        <Table
          onChange={this.handleTableChange}
          columns={this.getColumns()}
          dataSource={this.getDataSource()}
          pagination={this.getPagination()}/>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  userList: state.UserReducer.userList,
  count: state.UserReducer.count
});
const mapDispatchToProps = dispatch => ({
  queryUserList: payload => dispatch(UserAction.userList(payload)),
  deleteUser: id => dispatch(UserAction.userDelete(id)),
  passwordRest: payload => dispatch(UserAction.userReset(payload)),
});
export default connect(mapStateToProps, mapDispatchToProps)(UserList);

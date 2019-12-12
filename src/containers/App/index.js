import './style.less'
import React from 'react'
import { Layout, Menu, Icon, Spin, Dropdown, Input } from 'antd'
import { NavLink } from 'react-router-dom'
import LoginForm from 'containers/Login'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'
import LoginAction from './action'
import Config from './config'

const { Header, Sider, Content } = Layout

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      collapsed: false,
      password: '',
      selectedKeys: this.getSelectedKey(),
      isLogin: Cookies.get('admin_login') || null // null、true、false
    }
  }

  componentDidMount() {
    this.props.info().then(this.setLoginInfo, this.removeLoginInfo).catch(this.removeLoginInfo)
    window.addEventListener('hashchange', (HashChangeEvent) => {
      const { newURL, oldURL } = HashChangeEvent
      if (this.getPathname(newURL) !== this.getPathname(oldURL)) {
        this.setState({ selectedKeys: this.getSelectedKey() })
      }
    })
  }

  setLoginInfo = () => {
    Cookies.set('admin_login', 1)
    this.setState({ isLogin: true })
  }

  removeLoginInfo = () => {
    Cookies.remove('admin_login')
    this.setState({ isLogin: false })
  }

  logout = () => {
    this.props.logout().then(this.removeLoginInfo)
  }

  resetPassword = () => {
    Modal.confirm({
      title: '是否修改密码?',
      content: <Input placeholder="请输入新密码" onChange={(e) => this.setState({ password: e.target.value })}/>,
      onOk: () => {
        const { password } = this.state
        if (password) {
          return new Promise((resolve, reject) => {
            this.props.resetPassword({ password }).then(resolve, reject)
          });
        } else {
          message.error('请输入密码')
          return Promise.reject('请输入密码');
        }
      },
    })
  }

  getSelectedKey = () => {
    const { pathname } = this.props.location
    const [path, router] = pathname.split('/')
    return ['/' + router]
  }

  getPathname = (url) => {
    if (url.includes('#/')) {
      const hash = url.split('#/')[1]
      return hash.split('?')[0]
    }
    return window.location.pathname
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  }

  handleLogin = (values) => {
    this.props.login(values).then(() => {
      this.setLoginInfo();
      this.props.info();
    })
  }

  renderLoginForm = () => {
    return <LoginForm onLogin={this.handleLogin} />
  }

  renderLoading = () => {
    return <section className="loading-page"><Spin size="large" /></section>
  }

  renderUserMenu = () => {
    return (
      <Menu>
        <Menu.Item key="0">
          <a onClick={this.logout}>
            退出登录
          </a>
        </Menu.Item>
        <Menu.Item key="1">
          <a onClick={this.resetPassword}>
            重置密码
          </a>
        </Menu.Item>
      </Menu>
    )
  }

  renedrLayout = () => {
    const { collapsed, selectedKeys } = this.state
    const { userInfo } = this.props
    return (
      <Layout className="app-container">
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo">{collapsed ? '微影' : '微影管理后台'}</div>
          <Menu theme="dark" selectedKeys={selectedKeys} mode="inline" >
            {Config.menus.map(menu => {
              return (<Menu.Item key={menu.path}>
                <NavLink to={menu.path}>
                  <Icon type={menu.icon} />
                  <span>{menu.name}</span>
                </NavLink>
              </Menu.Item>)
            })}
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0, display: 'flex' }}>
            <Icon
              className="trigger"
              type={collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
            <div className="user-info" style={{ textAlign: 'right', flex: 1, paddingRight: 30 }}>
              <Dropdown overlay={this.renderUserMenu()} placement="bottomRight">
                <a className="ant-dropdown-link" href="#">
                  {userInfo.name}<Icon type="down" />
                </a>
              </Dropdown>
            </div>
          </Header>
          <Content className="app-content">
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    )
  }

  renderChildren = () => {
    const { isLogin } = this.state
    if (isLogin === null) {
      return this.renderLoading()
    }
    return isLogin ? this.renedrLayout() : this.renderLoginForm()
  }

  render() {
    return this.renderChildren()
  }
}

const mapStateToProps = (state) => ({
  loginInfo: state.AppReducer.loginInfo,
  userInfo: state.AppReducer.userInfo,
});
const mapDispatchToProps = dispatch => ({
  login: payload => dispatch(LoginAction.login(payload)),
  logout: () => dispatch(LoginAction.logout()),
  info: () => dispatch(LoginAction.info()),
  resetPassword: (payload) => dispatch(LoginAction.reset(payload)),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);

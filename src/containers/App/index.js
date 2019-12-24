import './style.less'
import React from 'react'
import { Layout, Menu, Icon, Spin, Dropdown, Input, Modal } from 'antd'
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
    const [path, router, subRouter] = pathname.split('/')
    if (subRouter) {
      return [`/${router}`, `/${router}/${subRouter}`]
    }
    return [`/${router}`, `/${router}`]
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
          <Menu theme="dark" selectedKeys={[selectedKeys[1]]} defaultOpenKeys={[selectedKeys[0]]} mode="inline" >
            {Config.menus.map(menu => {
              if (menu.children) {
                return (
                  <Menu.SubMenu key={menu.path} title={
                    <span>
                      <Icon type={menu.icon} />
                      <span>{menu.name}</span>
                    </span>
                  }>
                    {menu.children.map(child =>
                      <Menu.Item key={child.path}>
                        <NavLink to={child.path}>
                          <span>{child.name}</span>
                        </NavLink>
                      </Menu.Item>)}
                  </Menu.SubMenu>
                )
              }
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
                <a className="ant-dropdown-link">
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
  login: payload => dispatch(LoginAction.appLogin(payload)),
  logout: () => dispatch(LoginAction.appLogout()),
  info: () => dispatch(LoginAction.appInfo()),
  resetPassword: (payload) => dispatch(LoginAction.appReset(payload)),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);

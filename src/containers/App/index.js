import './style.less'
import React from 'react'
import { Layout, Menu, Icon, Spin } from 'antd'
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
      selectedKeys: [this.props.location.pathname],
      isLogin: Cookies.get('admin_login') || null // null、true、false
    }
  }

  componentDidMount() {
    window.addEventListener('hashchange', (HashChangeEvent) => {
      const { newURL, oldURL } = HashChangeEvent
      if (this.getPathname(newURL) !== this.getPathname(oldURL)) {
        this.setState({ selectedKeys: [this.props.location.pathname] })
      }
    })
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
    this.props.login(values).then(() => this.setState({ isLogin: true }))
  }

  renderLoginForm = () => {
    return <LoginForm onLogin={this.handleLogin}/>
  }

  renderLoading = () => {
    return <section className="loading-page"><Spin size="large" /></section>
  }

  renedrLayout = () => {
    const { collapsed, selectedKeys } = this.state
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
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
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
  loginInfo: state.AppReducer.loginInfo
});
const mapDispatchToProps = dispatch => ({ login: payload => dispatch(LoginAction.login(payload)) });
export default connect(mapStateToProps, mapDispatchToProps)(App);

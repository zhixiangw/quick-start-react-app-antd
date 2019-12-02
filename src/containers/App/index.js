import React from 'react'
import { Layout, Menu, Icon, Spin } from 'antd'
import { NavLink } from 'react-router-dom'
import Config from './config'
import './style.less'
import LoginForm from 'containers/Login'

const { Header, Sider, Content } = Layout

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      collapsed: false,
      selectedKeys: [this.props.location.pathname],
      isLogin: null // null、true、false
    }
  }

  componentDidMount() {
    // 模拟接口请求
    setTimeout(() => {
      this.setState({ isLogin: false })
    }, 1500)
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
    // 登录接口
    console.log(values)
    this.setState({ isLogin: true })
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

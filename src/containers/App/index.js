import React from 'react'
import { Layout, Menu, Icon } from 'antd'
import { NavLink } from 'react-router-dom'
import Config from './config'
import './style.less'

const { Header, Sider, Content } = Layout;

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      collapsed: false,
      selectedKeys: [this.props.location.pathname]
    };
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
    });
  };

  render() {
    return (
      <Layout className="app-container">
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo">{this.state.collapsed ? '微影' : '微影管理后台'}</div>
          <Menu theme="dark" selectedKeys={this.state.selectedKeys} mode="inline" >
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
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content className="app-content">
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

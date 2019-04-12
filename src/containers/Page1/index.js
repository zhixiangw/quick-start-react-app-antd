import React from 'react'
import { Button } from 'antd'

export default class Page1 extends React.Component {
  render() {
    const style = {
      position: 'absolute',
      height: 300,
      width: '100%',
      backgroundColor: 'brown'
    }
    return (
      <div style={style}>
        <h1>Page 1</h1>
        <Button type="primary" onClick={() => this.props.history.push('/page2')}>push to page 2</Button>
        <Button type="primary" onClick={() => this.props.history.replace('/page2')}>replace to page 2</Button>
        <Button type="primary" onClick={() => window.location.replace(window.location.origin + '/#/page2')}>window replace to page 2</Button>
        <Button type="primary" onClick={() => window.location.href = window.location.origin + '/#/page2'}>href to page 2</Button>
      </div>
    )
  }
}
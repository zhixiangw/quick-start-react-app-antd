import React from 'react'
import { Button } from 'antd'

export default class Page2 extends React.Component {
  render() {
    const style = {
      position: 'absolute',
      height: 300,
      width: '100%',
      backgroundColor: 'blueviolet'
    }
    return (
      <div style={style}>
        <h1>Page 2</h1>
        <Button type="primary" onClick={() => this.props.history.goBack()}>goback</Button>
        <Button type="primary" onClick={() => this.props.history.go(-1)}>go -1</Button>
        <Button type="primary" onClick={() => this.props.history.go(-2)}>go -2</Button>
        <Button type="primary" onClick={() => window.history.go(-1)}>window go -1</Button>
        <Button type="primary" onClick={() => window.location.href = 'https://www.baidu.com'}>go baidu</Button>
      </div>
    )
  }
}
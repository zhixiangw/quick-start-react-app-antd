import React from 'react'
import { Button } from 'antd'

export default class App extends React.Component {
  render() {
    const style = {
      position: 'absolute',
      height: 300,
      width: '100%',
      backgroundColor: 'antiquewhite'
    }
    return (
      <div style={style}>
        <Button type="primary" onClick={() => this.props.history.push('/page1')}>to page1</Button>
      </div>
    )
  }
}
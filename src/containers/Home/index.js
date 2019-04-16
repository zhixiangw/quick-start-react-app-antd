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
        <h1>Home page</h1>
        <Button>demo</Button>
      </div>
    )
  }
}
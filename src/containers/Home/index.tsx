import * as React from 'react'
import { Button } from 'antd'

export default class App extends React.Component<any, { a: any }> {
  a = {
    b: undefined
  }
  render() {
    const style = {
      position: 'absolute',
      height: 300,
      width: '100%',
      backgroundColor: 'antiquewhite'
    } as React.CSSProperties
    console.log(this.a?.b?.c?.length)
    return (
      <div style={style}>
        <h1>Home page</h1>
        <Button>demo</Button>
      </div>
    )
  }
}
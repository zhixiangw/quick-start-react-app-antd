import React from 'react'
import { Button } from 'antd'

export default class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Home page</h1>
        <Button onClick={() => this.props.history.push('/pool')}>demo</Button>
      </div>
    )
  }
}
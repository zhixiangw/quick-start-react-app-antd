import React from 'react'
import { Button } from 'antd'

export default class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <h1>Dashboard</h1>
        <Button onClick={() => this.props.history.push('/movie')}>movie</Button>
      </div>
    )
  }
}
import './style.less'
import React from 'react'
import { Button } from 'antd'

class ClassComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0
    }
  }

  handleIncrementClick = () => {
    this.setState({ count: this.state.count + 1 })
  }

  handleDecrementClick = () => {
    this.setState({ count: this.state.count - 1 })
  }

  render() {
    const { count } = this.state
    return (
      <div className="blueviolet">
        <h1>{count}</h1>
        <Button type="primary" onClick={this.handleIncrementClick}>incrementCount</Button>
        <Button onClick={this.handleDecrementClick}>decrementCount</Button>
      </div>
    )
  }
}

export default ClassComponent
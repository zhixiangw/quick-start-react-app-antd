import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button } from 'antd'

import AppAction from './action'

interface IProps {
  reducer: {
    counter: number
  },
  action: {
    incrementCount: Function,
    decrementCount: Function
  },
  history: any
}

class App extends React.Component<IProps> {
  handleIncrementClick = () => {
    let { counter } = this.props.reducer
    counter++
    this.props.action.incrementCount({ counter })
  }

  handleDecrementClick = () => {
    let { counter } = this.props.reducer
    counter--
    this.props.action.decrementCount({ counter })
  }

  render() {
    const { counter } = this.props.reducer
    const style = {
      position: 'absolute',
      height: 300,
      width: '100%',
      backgroundColor: 'red'
    } as React.CSSProperties
    return (
      <div style={style}>
        <Button type="primary" onClick={this.handleIncrementClick}>incrementCount</Button>
        <Button onClick={this.handleDecrementClick}>decrementCount</Button>
        <Button type="dashed">Dashed</Button>
        <Button type="link" onClick={() => this.props.history.push('/home')}>to Home</Button>
        <p>{counter}</p>
      </div>
    )
  }
}

const mapStateToProps = state => ({ reducer: state.AppReducer })
const mapDispatchToProps = dispatch => ({ action: bindActionCreators(AppAction, dispatch) })
export default connect(mapStateToProps, mapDispatchToProps)(App)
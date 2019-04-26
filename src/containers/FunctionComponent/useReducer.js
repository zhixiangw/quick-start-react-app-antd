import './style.less'
import React, { useReducer } from 'react'
import { Button } from 'antd'


const initFunc = (arg) => ({ ...arg, initState: 1 })
export default function UseReducer () {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'increment':
        return { ...state, count: state.count + 1 }

      case 'decrement':
        return { ...state, count: state.count - 1 }

      default:
        return initFunc({ count: 1 })
    }
  }, { count: 1 }, initFunc)
  return (
    <div className="antiquewhite">
      <h1>state：{JSON.stringify(state)}</h1>
      <h1>count：{state.count}</h1>
      <Button type="primary" onClick={() => dispatch({ type: 'increment' })}>incrementCount</Button>
      <Button type="primary" onClick={() => dispatch({ type: 'decrement' })}>decrementCount</Button>
    </div>
  )
}

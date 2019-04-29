import './style.less'
import React, { useState, useEffect, useDebugValue } from 'react'
import { Button } from 'antd'
import Header from './header'

export default function FunctionComponet () {
  const [count, setCount] = useState(0)
  const offsetTop = useWindowScroll()

  return (
    <div className="antiquewhite">
      <Header />
      <h1 style={{ marginTop: 100 }}>{count}</h1>
      <Button type="primary" onClick={() => setCount(count + 1)}>incrementCount</Button>
      <Button onClick={() => setCount(count - 1)}>decrementCount</Button>
      <h3>offsetTop: {offsetTop}</h3>
    </div>
  )
}

export function useWindowScroll() {
  const [offsetTop, setOffsetTop] = useState(0)
  const handleScroll = (e) => {
    const currentOffsetTop = e.target.documentElement.scrollTop
    setOffsetTop(currentOffsetTop)
  }
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => (window.removeEventListener('scroll', handleScroll))
  })
  useDebugValue(offsetTop)
  return offsetTop
}

// 不过这里需要注意的是，每次 useReducer 或者自己的 Custom Hooks 都不会持久化数据，
// 所以比如我们创建两个 App，App1 与 App2: 那么这两个实例同时渲染时，并不是共享一个数据源，而是分别存在两个独立数据源。
// 也就是 React Hooks 只提供状态处理方法，不会持久化状态。
// 如果要真正实现一个 Redux 功能，也就是全局维持一个状态，任何组件 useReducer 都会访问到同一份数据，可以和 useContext 一起使用。
// 大体思路是利用 useContext 共享一份数据，作为 Custom Hooks 的数据源。具体实现可以参考 redux-react-hook。
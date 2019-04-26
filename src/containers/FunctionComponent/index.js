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
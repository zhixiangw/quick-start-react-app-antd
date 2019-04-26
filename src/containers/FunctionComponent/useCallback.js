import './style.less'
import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { Button } from 'antd'

// useCallback(fn, deps) 相当于 useMemo(() => fn, deps)
export default function UseCallback () {
  const [count, setCount] = useState(0)
  const hasQuery = useCallback(() => true, [])
  const memo = useMemo(() => () => true, [])
  useEffect(() => {
    console.log('注册effect...')
    return () => console.log('卸载effect...')
  }, [hasQuery, memo])
  console.log('渲染...')
  return (
    <div className="antiquewhite">
      <h1>now: {count}</h1>
      <Button type="primary" onClick={() => setCount(count + 1)}>incrementCount</Button>
    </div>
  )
}

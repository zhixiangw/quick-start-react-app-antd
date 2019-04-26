import './style.less'
import React, { useState, useEffect, useCallback } from 'react'
import { Button } from 'antd'


/**
 *  1、执行时机
 *  2、模拟生命周期
 *  3、用函数作为deps
 * */
export default function UseEffect () {
  const [count, setCount] = useState(0)
  const hasQuery = useCallback(() => true, [])
  useEffect(() => {
    console.log('注册effect...')
    return () => console.log('卸载effect...')
  }, [hasQuery])
  console.log('渲染...')
  return (
    <div className="antiquewhite">
      <h1>now: {count}</h1>
      <Button type="primary" onClick={() => setCount(count + 1)}>incrementCount</Button>
    </div>
  )
}

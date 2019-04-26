import './style.less'
import React, { useState } from 'react'
import { Button } from 'antd'

export default function UseState () {
  const [count, setCount] = useState(0)
  const [num, setNum] = useState(() => 1)
  const [obj, setObj] = useState({ a: 1, b: 2 })
  return (
    <div className="antiquewhite">
      <h1>{count}</h1>
      <Button type="primary" onClick={() => setCount(count + 1)}>incrementCount</Button>
      <h1>{num}</h1>
      <Button onClick={() => setNum(num + 1)}>incrementNum</Button>
      <h1>{JSON.stringify(obj)}</h1>
      <Button onClick={() => setObj({ ...obj, a: obj.a + 1 })}>increment Obj key a</Button>
      <Button type="primary"
        onClick={() => setTimeout(() => {
        alert(count)
      }, 3000)}>3s delay</Button>
    </div>
  )
}

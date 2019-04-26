import './style.less'
import React, { useContext } from 'react'

const MyContext = React.createContext()
export default function UseContextParent () {
  return (
    <MyContext.Provider value="use context">
      <UseContext />
    </MyContext.Provider>
  )
}

// eslint-disable-next-line react/no-multi-comp
function UseContext () {
  const context = useContext(MyContext)
  return (
    <h1>{context}</h1>
  )
}

import './style.less'
import React, { useLayoutEffect, useEffect, useRef, useImperativeHandle, forwardRef } from 'react'


// useCallback(fn, deps) 相当于 useMemo(() => fn, deps)
export default function UseRefParent () {
  const ref = useRef(null)
  useEffect(() => {
    console.log(ref.current)
    ref.current.selfFocus()
    ref.current.setValue('use ref')
  }, [])
  return (
    <div className="antiquewhite">
      <ForwardUseRef ref={ref}/>
    </div>
  )
}

// eslint-disable-next-line react/no-multi-comp
function UseRef (props, ref) {
  console.log('props', props)
  const inputRef = useRef(null)
  useImperativeHandle(ref, () => ({
    selfFocus: () => inputRef.current.focus(),
    setValue: (value) => inputRef.current.value = value,
  }))
  return <input ref={inputRef}/>
}
const ForwardUseRef = forwardRef(UseRef)

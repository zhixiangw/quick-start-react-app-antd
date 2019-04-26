import React, { useRef, useLayoutEffect } from 'react'
import { useWindowScroll } from './index'

export default function Header () {
  const headerRef = useRef(null)
  const opacity = useOpacity()
  useLayoutEffect(() => {
    headerRef.current.style.background = `rgba(255, 255, 255, ${opacity || 1})`
  }, [opacity])
  return <header ref={headerRef}>Hooks Header</header>
}

function useOpacity() {
  const offsetTop = useWindowScroll()
  return offsetTop > 100 ? 1 : offsetTop / 100
}
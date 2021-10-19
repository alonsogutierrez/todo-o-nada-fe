import React, { useState, useEffect } from 'react'

import DesktopHeaderMain from './DesktopHeaderMain'
import MobileHeaderMain from './MobileHeaderMain'

const HeaderMain = () => {
  const [width, setWidth] = useState(window.innerWidth)

  const updateDimensions = () => {
    setWidth(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [width])

  const isDesktopScreen = width >= 992

  if (isDesktopScreen) {
    return <DesktopHeaderMain />
  }
  return <MobileHeaderMain />
}

export default HeaderMain

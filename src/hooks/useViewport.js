import { useState, useEffect } from 'react'
import isEqual from 'lodash/isEqual'

const getViewports = viewportsMap => {
  const viewports = {}

  for (const viewport in viewportsMap) {
    viewports[viewport] = window.matchMedia(viewportsMap[viewport]).matches
  }

  return viewports
}

const useViewport = viewportMap => {
  const [viewports, setViewports] = useState(getViewports(viewportMap))

  useEffect(() => {
    const handleResize = () => {
      const newViewports = getViewports(viewportMap)

      if (!isEqual(viewports, newViewports)) setViewports(newViewports)
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  })

  return viewports
}

export default useViewport

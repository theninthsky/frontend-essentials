import { useState, useEffect } from 'react'
import isEqual from 'lodash/isEqual'

type ViewportMap = {
  [index: string]: string
}

type Viewports = {
  [index: string]: boolean
}

const getViewports = (viewportsMap: ViewportMap) => {
  const viewports: Viewports = {}

  for (const viewport in viewportsMap) {
    viewports[viewport] = window.matchMedia(viewportsMap[viewport]).matches
  }

  return viewports
}

const useViewport = (viewportMap: ViewportMap) => {
  const [viewports, setViewports] = useState(getViewports(viewportMap))

  useEffect(() => {
    const handleResize = () => {
      const newViewports = getViewports(viewportMap)

      if (!isEqual(viewports, newViewports)) setViewports(newViewports)
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [viewports])

  return viewports
}

export default useViewport

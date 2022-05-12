import { useState, useLayoutEffect, FC } from 'react'

export type MediaProps = {
  query: string | string[]
  invert?: boolean
  children: any
}

const Media: FC<MediaProps> = ({ query, invert, children }) => {
  const [matches, setMatches] = useState(false)

  useLayoutEffect(() => {
    const handleResize = () => {
      if (Array.isArray(query)) return setMatches(query.some(q => window.matchMedia(q).matches))

      const { matches } = window.matchMedia(query)

      setMatches(invert ? !matches : matches)
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [query])

  return children && matches ? children : null
}

export default Media

import { useState, useEffect, FC } from 'react'

type Props = {
  query: string | string[]
  invert?: boolean
  children: any
}

const Media: FC<Props> = ({ query, invert, children }) => {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
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

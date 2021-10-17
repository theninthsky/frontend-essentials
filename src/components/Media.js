import { useState, useEffect } from 'react'
import { bool, string, any, arrayOf, oneOfType } from 'prop-types'

const Media = ({ query, invert, children }) => {
  const [matches, setMatches] = useState()

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

Media.propTypes = {
  query: oneOfType([string, arrayOf(string)]).isRequired,
  invert: bool,
  children: any.isRequired
}

export default Media

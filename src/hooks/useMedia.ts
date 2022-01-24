import { useState, useEffect } from 'react'
import isEqual from 'lodash/isEqual'

type QueriesMap = {
  [index: string]: string
}

type Queries = {
  [index: string]: boolean
}

const getQueries = (queriesMap: QueriesMap) => {
  const queries: Queries = {}

  for (const query in queriesMap) {
    queries[query] = window.matchMedia(queriesMap[query]).matches
  }

  return queries
}

const useMedia = (queriesMap: QueriesMap) => {
  const [queries, setQueries] = useState(getQueries(queriesMap))

  useEffect(() => {
    const handleResize = () => {
      const newQueries = getQueries(queriesMap)

      if (!isEqual(queries, newQueries)) setQueries(newQueries)
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [queries])

  return queries
}

export default useMedia

import { useState, useEffect, useCallback } from 'react'
import { unstable_batchedUpdates as batch } from 'react-dom'

import toCamelCasedKeys from '../utils/camel-cased-keys'

export type UseFetchRequestConfig = RequestInit & {
  manual?: boolean
  keepPreviousData?: boolean
  camelCasedKeys?: boolean
  onSuccess?: (res: { response: Response; status: number; data?: any }) => void
  onError?: (res: { response: Response; status: number; error: string }) => void
}

export type UseFetchResponse = {
  loading: boolean
  response?: Response
  status?: number
  error?: string
  data?: any
  activate: (config?: UseFetchRequestConfig) => Promise<void>
}

const useFetch = (
  url: string,
  {
    manual,
    keepPreviousData,
    camelCasedKeys,
    onSuccess: initialOnSuccess,
    onError: initialOnError,
    ...initialOptions
  }: UseFetchRequestConfig = {}
): UseFetchResponse => {
  const [loading, setLoading] = useState(!manual)
  const [response, setResponse] = useState<Response | undefined>()
  const [status, setStatus] = useState<number | undefined>()
  const [error, setError] = useState<string | undefined>()
  const [data, setData] = useState<number | undefined>()

  useEffect(() => {
    if (!manual) fetchData()
  }, [manual])

  const fetchData = useCallback(async ({ onSuccess = initialOnSuccess, onError = initialOnError, ...options } = {}) => {
    setLoading(true)
    setResponse(undefined)
    setStatus(undefined)
    setError(undefined)
    if (!keepPreviousData) setData(undefined)

    try {
      const res = await fetch(url, {
        ...initialOptions,
        ...options
      })

      if (!res.ok) throw res

      const json = res.headers.get('content-type')?.includes('application/json')
      const data = json ? await res.json() : undefined

      onSuccess?.({ response: res, status: res.status, data: camelCasedKeys ? toCamelCasedKeys(data) : data })

      batch(() => {
        setLoading(false)
        setResponse(res)
        setStatus(res.status)
        setData(camelCasedKeys ? toCamelCasedKeys(data) : data)
      })
    } catch (res: Response | any) {
      const { status, statusText } = res

      onError?.({ response: res, status: status, error: statusText })

      batch(() => {
        setLoading(false)
        setResponse(res)
        setStatus(status)
        setError(statusText)
      })
    }
  }, [])

  return { loading, response, status, error, data, activate: fetchData }
}

export default useFetch

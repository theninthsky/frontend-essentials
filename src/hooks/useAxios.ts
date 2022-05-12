import { useState, useEffect, useCallback } from 'react'
import { unstable_batchedUpdates as batch } from 'react-dom'
import Axios, { AxiosRequestConfig, AxiosError } from 'axios'

import toCamelCasedKeys from '../utils/camel-cased-keys'

export const axios = Axios

export type UseAxiosRequestConfig = AxiosRequestConfig & {
  manual?: boolean
  keepPreviousData?: boolean
  camelCasedKeys?: boolean
  onSuccess?: (res: { status: number; data?: any }) => void
  onError?: (res: { status?: number; error: AxiosError | Error; data?: any }) => void
}

export type UseAxiosResponse = {
  loading: boolean
  status?: number
  error?: any
  data?: any
  activate: (config?: UseAxiosRequestConfig) => Promise<void>
}

const useAxios = ({
  manual,
  keepPreviousData,
  camelCasedKeys: initialCamelCasedKeys,
  onSuccess: initialOnSuccess,
  onError: initialOnError,
  ...initialAxiosOptions
}: UseAxiosRequestConfig): UseAxiosResponse => {
  const [loading, setLoading] = useState(!manual)
  const [status, setStatus] = useState<number | undefined>()
  const [error, setError] = useState<number | undefined>()
  const [data, setData] = useState<number | undefined>()

  useEffect(() => {
    if (!manual) fetchData()
  }, [manual])

  const fetchData = useCallback(
    async ({
      camelCasedKeys = initialCamelCasedKeys,
      onSuccess = initialOnSuccess,
      onError = initialOnError,
      ...axiosOptions
    } = {}) => {
      setLoading(true)
      setStatus(undefined)
      setError(undefined)
      if (!keepPreviousData) setData(undefined)

      try {
        const { status, data } = await Axios({
          ...initialAxiosOptions,
          ...axiosOptions
        })

        onSuccess?.({ status, data: camelCasedKeys ? toCamelCasedKeys(data) : data })

        batch(() => {
          setLoading(false)
          setStatus(status)
          setData(camelCasedKeys ? toCamelCasedKeys(data) : data)
        })
      } catch (error: any) {
        const status = error.response?.status

        onError?.({ status, error })

        batch(() => {
          setLoading(false)
          setStatus(status)
          setError(error)
        })
      }
    },
    []
  )

  return { loading, status, error, data, activate: fetchData }
}

export default useAxios

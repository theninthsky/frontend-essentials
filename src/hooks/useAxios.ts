import { useState, useEffect, useCallback } from 'react'
import { unstable_batchedUpdates as batch } from 'react-dom'
import Axios, { AxiosRequestConfig, AxiosError } from 'axios'

export const axios = Axios

type RequestConfig = AxiosRequestConfig & {
  manual?: boolean
  onSuccess?: (res: { status: number; data?: any }) => void
  onError?: (res: { status?: number; error: AxiosError | Error; data?: any }) => void
}

type Response = {
  loading: boolean
  status?: number
  error?: any
  data?: any
  activate: (config?: RequestConfig) => Promise<void>
}

const useAxios = ({
  manual,
  onSuccess: initialOnSuccess,
  onError: initialOnError,
  ...initialAxiosOptions
}: RequestConfig): Response => {
  const [loading, setLoading] = useState(!manual)
  const [status, setStatus] = useState<number | undefined>()
  const [error, setError] = useState<number | undefined>()
  const [data, setData] = useState<number | undefined>()

  useEffect(() => {
    if (!manual) fetchData()
  }, [manual]) // eslint-disable-line

  const fetchData = useCallback(
    async ({ onSuccess = initialOnSuccess, onError = initialOnError, ...axiosOptions } = {}) => {
      setLoading(true)
      setStatus(undefined)
      setError(undefined)
      setData(undefined)

      try {
        const { status, data } = await Axios({
          ...initialAxiosOptions,
          ...axiosOptions
        })

        onSuccess?.({ status, data })

        batch(() => {
          setLoading(false)
          setStatus(status)
          setData(data)
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

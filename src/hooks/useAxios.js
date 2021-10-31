import { useState, useEffect } from 'react'
import { unstable_batchedUpdates as batch } from 'react-dom'
import Axios from 'axios'

export const axios = Axios

const useAxios = ({ manual, onSuccess: initialOnSuccess, onError: initialOnError, ...initialAxiosOptions }) => {
  const [loading, setLoading] = useState(!manual)
  const [status, setStatus] = useState()
  const [error, setError] = useState()
  const [data, setData] = useState()

  useEffect(() => {
    if (!manual) fetchData()
  }, [manual]) // eslint-disable-line

  const fetchData = async ({ onSuccess = initialOnSuccess, onError = initialOnError, ...axiosOptions } = {}) => {
    setLoading(true)
    setStatus()
    setError()
    setData()

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
    } catch (error) {
      const status = error.response?.status

      onError?.({ status, error })

      batch(() => {
        setLoading(false)
        setStatus(status)
        setError(error)
      })
    }
  }

  return { loading, status, error, data, activate: fetchData }
}

export default useAxios

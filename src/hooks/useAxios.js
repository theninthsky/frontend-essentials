import { useState, useEffect } from 'react'
import { unstable_batchedUpdates as batch } from 'react-dom'
import axios from 'axios'

const useAxios = ({ suspense, onSuccess: initialOnSuccess, onError: initialOnError, ...initialAxiosOptions }) => {
  const [loading, setLoading] = useState(!suspense)
  const [status, setStatus] = useState()
  const [error, setError] = useState()
  const [data, setData] = useState()

  useEffect(() => {
    if (!suspense) fetchData({ onSuccess: initialOnSuccess, onError: initialOnError })
  }, [suspense]) // eslint-disable-line

  const fetchData = async ({ onSuccess, onError, ...axiosOptions } = {}) => {
    setLoading(true)
    setStatus()
    setError()
    setData()

    try {
      const { status, data } = await axios({ withCredentials: true, ...initialAxiosOptions, ...axiosOptions })

      batch(() => {
        setLoading(false)
        setStatus(status)
        setData(data)
      })

      onSuccess?.({ status, data })
    } catch (err) {
      batch(() => {
        setLoading(false)
        setStatus(err.response.status)
        setError(err)
      })

      onError?.({ status, error, data })
    }
  }

  return { loading, status, error, data, activate: fetchData }
}

export default useAxios

import { useState, useEffect } from 'react'
import { unstable_batchedUpdates as batch } from 'react-dom'
import axios from 'axios'

const useAxios = ({ suspense, ...initialAxiosOptions }, initialCallback) => {
  const [loading, setLoading] = useState(!suspense)
  const [status, setStatus] = useState()
  const [error, setError] = useState()
  const [data, setData] = useState()

  useEffect(() => {
    if (!suspense) fetchData({}, initialCallback)
  }, [suspense]) // eslint-disable-line

  const fetchData = async (axiosOptions = {}, callback) => {
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

      callback?.({ status, data })
    } catch (err) {
      batch(() => {
        setLoading(false)
        setStatus(err.response.status)
        setError(err)
      })
    }
  }

  return { loading, status, error, data, activate: fetchData }
}

export default useAxios

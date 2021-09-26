import { useState, useLayoutEffect } from 'react'
import { unstable_batchedUpdates as batch } from 'react-dom'
import axios from 'axios'

const useAxios = ({ suspense, ...initialAxiosOptions }) => {
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState()
  const [error, setError] = useState()
  const [data, setData] = useState()

  useLayoutEffect(() => {
    if (!suspense) fetchData()
  }, [suspense]) // eslint-disable-line

  const fetchData = async (axiosOptions = {}) => {
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

import { useEffect, useState } from 'react'
import axios from 'axios'

const clientAxios = () => {
  return axios.create({
    baseURL: process.env.API_BFF_URL,
    timeout: process.env.TIMEOUT,
  })
}

const useAxios = (url) => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)
  const requestData = async () => {
    const clientAPI = new clientAxios()
    const response = await clientAPI.get(url)
    setData(response.data)
    setLoading(false)
  }

  useEffect(() => {
    requestData()
  }, [])

  return { loading, data }
}

export default useAxios

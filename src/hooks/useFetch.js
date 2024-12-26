import { useEffect, useState } from "react"

const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const base_url = "https://mustafocoder.pythonanywhere.com"
  useEffect(() => {
    const getHandler = async() => {
      setLoading(true)
      try {
        const res = await fetch(base_url + url, options)
        if(!res.ok) throw new Error("Server error")
        const json = await res.json() 
        setData(json)
        setError(null)
      } catch (error) {
        setError(error)
      }finally{
        setLoading(false)
      }
    }
    getHandler()
  }, [url])

  return {data, loading, error}
}

export default useFetch
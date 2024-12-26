import React, { useEffect } from 'react'
import Articles from './Articles'
import { useDispatch, useSelector } from 'react-redux'
import useFetch from '../hooks/useFetch'
import { setError, setLoading, setArticles } from '../slices/articlesSlice'
import { CircularProgress } from '@mui/material'
const ArticlesPage = () => {
  const { data, loading, error } = useFetch("/api/articles/")
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setError(error))
    dispatch(setLoading(loading))
    dispatch(setArticles(data))
  }, [data, loading, error])
  const { articles } = useSelector(state => state.articles)

  return (
    <div>
      {loading && <div className='flex justify-center py-20 text-5xl'>
        <CircularProgress color="inherit" />
      </div>}
      {articles && <Articles articles={articles} />}
    </div>
  )
}

export default ArticlesPage
import React, { useEffect } from 'react'
import Articles from './Articles'
import { useDispatch, useSelector } from 'react-redux'
import { setError, setLoading, setArticles } from '../slices/articlesSlice'
import { CircularProgress } from '@mui/material'
import SearchForm from './SearchForm'
import { useGetArticlesQuery } from '../service/api'
const Home = () => {
  const { data, isLoading, error } = useGetArticlesQuery()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setError(error))
    dispatch(setLoading(isLoading))
    dispatch(setArticles(data))
  }, [data, isLoading, error])
  const { articles } = useSelector(state => state.articles)
  
  return (
    <div>
      <SearchForm />
      {isLoading && <div className='flex justify-center py-20 text-5xl'>
        <CircularProgress color="inherit" />
      </div>}
      {articles && <Articles articles={[...articles].reverse()} />}
    </div>
  )
}

export default Home
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import { Articles } from '.'
import { CircularProgress } from '@mui/material'
import { useSearchArticlesQuery } from '../service/api'

const Search = () => {
  const { query } = useParams()
  const { data, loading, error } = useSearchArticlesQuery(query)

  return (
    <div>
      {loading && <div className='flex justify-center py-20 text-5xl'>
        <CircularProgress color="inherit" />
      </div>}
      {data && !error ? <Articles articles={data} /> : <div className='py-20 text-center opacity-20 text-4xl font-bold'>
        Not found
      </div>}
    </div>
  )
}

export default Search
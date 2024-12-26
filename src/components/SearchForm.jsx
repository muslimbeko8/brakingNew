import * as React from 'react';
import {
  Paper, InputBase,
  Divider,
  IconButton,
} from '@mui/material';
import {Search} from "@mui/icons-material"
import { useNavigate } from 'react-router-dom';
const SearchForm = () => {
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    navigate(`/search/${formData.get("query")}`)
  }
  return (
    <div className='flex justify-center py-10 px-5'>
        <Paper
          onSubmit={handleSubmit}
          component="form"
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', maxWidth: 400, width: "100%" }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            name='query'
            placeholder="Search articles"
            inputProps={{ 'aria-label': 'search articles' }}
          />
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <Search/>
          </IconButton>
        </Paper>
    </div>
  )
}

export default SearchForm
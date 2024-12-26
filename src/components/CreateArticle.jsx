import React, { useEffect, useState } from 'react'
import { createArticleAPI } from '../service/api';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import { CloudUpload, Send } from '@mui/icons-material';
import styled from 'styled-components';
import { LoadingButton } from '@mui/lab';

const CreateArticle = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false)
  const { user, isAuthenticated } = useSelector(state => state.auth)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated])
  const formSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const body = {
      author: user.username
    }
    const formData = new FormData(e.target)
    formData.forEach((val, key) => {
      body[key] = val
    })
    const token = localStorage.getItem("token")
    try {
      const res = await createArticleAPI(body, token)
      console.log(res);
      setError(false)
      navigate(`/articles/${res.id}`)
    } catch (error) {
      setError(true)
      console.log(error);
    } finally {
      setLoading(false)
    }
  }
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });
  return (
    <div className='min-h-[calc(100vh-100px)] justify-center flex items-center'>
      <form onSubmit={formSubmit} className="w-[400px] shadow px-5 py-10 rounded">
        <h3 className='font-bold text-3xl text-center mb-5'>Create an article</h3>
        <TextField label="Title" variant='outlined' name='title' className='w-full' />
        <Button
          component="label"
          className='w-full'
          sx={{my: 1}}
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUpload />}
        >
          Upload files
          <VisuallyHiddenInput
            type="file"
            name='image'
            multiple
          />
        </Button>
        <TextField sx={{mb: 1}} label="Content" variant='outlined' name='content' className='w-full' />
        {error && <p className='text-sm text-red-500 text-center mb-5 font-semibold'>Something wen wrong. Error 500</p>}
        <LoadingButton
          endIcon={<Send />}
          loading={loading}
          loadingPosition="end"
          variant="contained"
          type='submit'
        >
          Create
        </LoadingButton>  
      </form>
    </div>
  )
}

export default CreateArticle
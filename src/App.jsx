import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { getUserAPI } from './service/api'
import { setIsAuthenticated, setUser } from './slices/authSlice'
import ArticlesPage from './components/ArticlesPage'
import ArticleDetails from './components/ArticleDetails'
import Login from './components/Login'
import SignUp from './components/SignUp'
import CreateArticle from './components/CreateArticle'
import UpdateArticle from './components/UpdateArticle'
import Search from './components/Search'
import Profile from './components/Profile'
import Navbar from './components/Navbar'
import Homee from './components/Homee'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const ls = localStorage.getItem("token")
    const getUserHandler = async (token) => {
      try {
        const res = await getUserAPI(token)
        dispatch(setUser(res))
        dispatch(setIsAuthenticated(true))
      } catch (error) {
        localStorage.removeItem("token")
      }
    }
    if (ls) {
      getUserHandler(ls)
    }
  }, [])

  return (
    <div className='dark:bg-black max-lg:pb-20 min-h-screen dark:text-white'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Homee />} />
        <Route path='/articles' element={<ArticlesPage />} />
        <Route path='/articles/:id' element={<ArticleDetails />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/create-article' element={<CreateArticle />} />
        <Route path='/update-article/:id' element={<UpdateArticle />} />
        <Route path='/search/:query' element={<Search />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </div>
  )
}

export default App
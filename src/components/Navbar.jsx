import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Logo } from '../assets'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../slices/authSlice'
import { Avatar, Box, Divider, Typography, Stack, Switch, IconButton, ListItemIcon, Menu, MenuItem, Tooltip, BottomNavigation, BottomNavigationAction } from '@mui/material'
import { Favorite, LocationOn, Logout, PersonAdd, Restore, Settings, Home, Newspaper, Add } from '@mui/icons-material'
import { styled, useColorScheme } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';

const Navbar = () => {
  const [userBar, setUserBar] = useState(true)
  const { isAuthenticated, user } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const logOutHandler = () => {
    dispatch(logOut())
    handleClose()
    localStorage.removeItem("token")
  }
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { mode, setMode } = useColorScheme()
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (darkMode) {
      setMode("dark")
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
      setMode("light")
    }
  }, [darkMode])
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
      margin: 1,
      padding: 0,
      transform: 'translateX(6px)',
      '&.Mui-checked': {
        color: '#fff',
        transform: 'translateX(22px)',
        '& .MuiSwitch-thumb:before': {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            '#fff',
          )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
        },
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: '#aab4be',
          ...theme.applyStyles('dark', {
            backgroundColor: '#8796A5',
          }),
        },
      },
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: '#001e3c',
      width: 32,
      height: 32,
      '&::before': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
      ...theme.applyStyles('dark', {
        backgroundColor: '#003892',
      }),
    },
    '& .MuiSwitch-track': {
      opacity: 1,
      backgroundColor: '#aab4be',
      borderRadius: 20 / 2,
      ...theme.applyStyles('dark', {
        backgroundColor: '#8796A5',
      }),
    },
  }));
  return (
    <div>
      <nav className="bg-white border-gray-200 dark:bg-black shadow-md dark:shadow-[#222]">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to={"/"} className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={Logo} className="h-8" alt="Flowbite Logo" />
            <span className="self-center text-3xl font-bold whitespace-nowrap">
              <span className='text-yellow-400'>B</span>
              <span className='text-red-500'>N</span>
            </span>
          </Link>
          {
            isAuthenticated ?
              <div className='md:order-2 flex max-lg:gap-5 items-center'>
                <FormControlLabel
                  onChange={(e) => setDarkMode(e.target.checked)}
                  sx={{ m: 0 }}
                  checked={darkMode}
                  control={<MaterialUISwitch sx={{ m: 1 }} />}
                />
                <Link className='rounded-full max-lg:hidden hover:bg-black dark:hover:bg-white create-article dark:hover:text-black dark:text-white hover:text-white transition-all flex items-center dark:border-white border-black gap-3 p-0.5 pe-5 border' to={"/create-article"}>
                  <span className='w-10 h-10 rounded-full flex items-center justify-center bg-black dark:bg-white dark:text-black text-white'>
                    <i className='fa fa-plus'></i>
                  </span>
                  Create Article
                </Link>
                <React.Fragment>
                  <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                    <Tooltip title="Account settings">
                      <IconButton
                        onClick={handleClick}
                        size="small"
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                      >
                        <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                      </IconButton>
                    </Tooltip>
                  </Box>
                  <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    slotProps={{
                      paper: {
                        elevation: 0,
                        sx: {
                          overflow: 'visible',
                          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                          mt: 1.5,
                          '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                          },
                          '&::before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                          },
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  >
                    <MenuItem onClick={handleClose}>
                      <Link to="/profile" className='flex items-center'>
                        <Avatar /> Profile
                      </Link>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <PersonAdd fontSize="small" />
                      </ListItemIcon>
                      Add another account
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <Settings fontSize="small" />
                      </ListItemIcon>
                      Settings
                    </MenuItem>
                    <MenuItem onClick={logOutHandler}>
                      <ListItemIcon>
                        <Logout fontSize="small" />
                      </ListItemIcon>
                      Logout
                    </MenuItem>
                  </Menu>
                </React.Fragment>
              </div>
              : <div className='flex font-bold items-center text-sm gap-2 md:order-2'>
                <FormControlLabel
                  onChange={(e) => setDarkMode(e.target.checked)}
                  sx={{ m: 0 }}
                  checked={darkMode}
                  control={<MaterialUISwitch sx={{ m: 1 }} />}
                />
                <Link className='border border-black px-6 transition-all hover:bg-black hover:text-white py-2.5 rounded' to={"/signup"}>Sign Up</Link>
                <Link className='text-white bg-black px-8 hover:text-black border border-black transition-all hover:bg-transparent py-2.5 rounded' to={"/login"}>Login</Link>
              </div>
          }

          <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
            <ul className="flex flex-col max-lg:hidden max-lg font-medium p-4 md:p-0 md:space-x-8 rtl:space-x-reverse md:flex-row">
              <li>
                <a href="#" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Home</a>
              </li>
              <li>
                <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</a>
              </li>
              <li>
                <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Services</a>
              </li>
            </ul>
          </div>
        </div>
        <div className='fixed lg:hidden z-50 bottom-1 start-[1.5%] rounded-xl px-5 py-1 w-[97%] dark:border-slate-500 border bg-white dark:bg-black flex justify-around items-center'>
          <NavLink to={"/"} className="rounded-xl p-2">
            <Home fontSize="large" />
          </NavLink>
          <NavLink to={"/create-article"} className='border rounded-xl p-2'>
            <Add fontSize='large' />
          </NavLink>
          <NavLink to={"/articles"} className="rounded-xl p-2">
            <Newspaper fontSize='large' />
          </NavLink>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
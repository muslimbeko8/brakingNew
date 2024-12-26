import React, { useEffect, useState } from 'react'
import { useSignUpApiMutation } from '../service/api'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setIsAuthenticated, setUser } from '../slices/authSlice'

const SignUp = () => {
  const [signUp, { isLoading }] = useSignUpApiMutation();
  const [error, setError] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  const formSubmit = async (e) => {
    e.preventDefault();
    const body = {};
    const formData = new FormData(e.target);
    formData.forEach((val, key) => {
      body[key] = val;
    });
    try {
      const res = await signUp(body).unwrap();
      console.log("response: ", res);
      
      dispatch(setUser(res.user));
      dispatch(setIsAuthenticated(true));
      localStorage.setItem("token", res.token);
      setError(false);
      navigate("/");
    } catch (error) {
      console.log(error)
      setError(true);
    }
  };

  return (
    <div className='min-h-[calc(100vh-100px)] justify-center flex items-center'>
      <form onSubmit={formSubmit} className="w-[400px] shadow px-5 py-10 rounded">
        <h3 className='font-bold text-3xl text-center mb-5'>Register</h3>
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium">Your email</label>
          <input name='email' type="text" id="email" className="bg-gray-50 border text-sm rounded-lg w-full p-2.5" placeholder="example@email.com" required />
        </div>
        <div className="mb-5">
          <label htmlFor="username" className="block mb-2 text-sm font-medium">Your username</label>
          <input name='username' type="text" id="username" className="bg-gray-50 border text-sm rounded-lg w-full p-2.5" placeholder="Username" required />
        </div>
        <div className="mb-5">
          <label htmlFor="password" className="block mb-2 text-sm font-medium">Your password</label>
          <input name='password' type="password" id="password" className="bg-gray-50 border text-sm rounded-lg w-full p-2.5" required />
        </div>
        <button type="submit" className="text-white bg-blue-700 rounded-lg text-sm w-full px-5 py-2.5">Submit</button>
      </form>
    </div>
  );
};

export default SignUp;
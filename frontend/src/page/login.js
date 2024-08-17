import React, { useState } from 'react'
import loginSignupImage from "../assest/login-animation.gif"
import { BiHide } from "react-icons/bi";
import { BiShow } from "react-icons/bi";
import { Link,useNavigate } from 'react-router-dom'
import {toast} from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { loginRedux } from '../redux/userSlice';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [data, setData] = useState({
    email : "",
    password : ""
  })

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const userData = useSelector(state => state.user)


  const handleShowPassword = () => {
    setShowPassword((prev) => !prev)
  }
   
  const handleOnChange = (e) =>{
    const {name,value} = e.target
    setData((prev) => {
      return{
        ...prev,
        [name] : value
      }
    })
  }
  // console.log(data)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    if (email && password) {
      try {
        const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
  
        const dataRes = await fetchData.json();
        // console.log('API Response:', dataRes); // Log API response
       
        toast(dataRes.message);
  
        if (dataRes.alert) {
          // console.log('Dispatching:', dataRes); // Log before dispatching
          dispatch(loginRedux(dataRes)) // Pass the response data as payload
          setTimeout(() => {
            navigate('/');
          }, 1000);
        }

        console.log(userData)

      } catch (error) {
        console.error('Error:', error);
        toast('An error occurred. Please try again.');
      }
    } else {
      alert('Please enter required fields.');
    }

  };

  return (
    <div className='p-3 md:p-4'>
      <div className='w-full max-w-sm bg-white m-auto flex items-center flex-col p-4'>
        <div className='w-20 overflow-hidden rounded-full drop-shadow-md shadow-md'>
            <img src={loginSignupImage} className='w-full'/>
        </div>

        <form className='w-full py-3 flex flex-col' onSubmit={handleSubmit}>
            <label htmlFor='email'>Email</label>
            <input type={"email"} id="email" name='email' className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300' value={data.email} onChange={handleOnChange} autoComplete='email'/>       
        
            <label htmlFor='password'>Password</label>
            <div className='flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300' value={data.password} onChange={handleOnChange}>
              <input type={showPassword ? "text" : "password"} id="password" name='password' className=' w-full bg-slate-200 border-none outline-none' autoComplete='current-password'/>
              <span className='flex text-xl cursor-pointer' onClick={handleShowPassword} >{showPassword ? <BiShow/> : <BiHide/>}</span>
            </div>

            <button className='w-full max-w-[120px] m-auto bg-red-500 hover:bg-red-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full'>
              Login
            </button>
            <p className='text-center text-sm mt-2'>Don't have account ?{" "} <Link to={"/signup"} className='text-red-500'>Sign Up</Link></p>
        </form>

      </div>
    </div>
  )
}

export default Login


// react redux is use here for to attched the data to provide the data to all components
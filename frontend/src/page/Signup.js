import React, { useState } from 'react'
import loginSignupImage from "../assest/login-animation.gif"
import { BiHide } from "react-icons/bi";
import { BiShow } from "react-icons/bi";
import { Link,useNavigate } from 'react-router-dom'
// import { BsEmojiSmileUpsideDown } from "react-icons/bs";
import { ImagetoBase64 } from '../utility/imagetoBase64'
import {toast} from 'react-hot-toast'

const Signup = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setConfirmPassword] = useState(false)
  const [data, setData] = useState({
    firstName : "",
    lastName : "",
    email : "",
    password : "",
    confirmPassword : "",
    image : ""
  })
  const handleShowPassword = () => {
    setShowPassword((prev) => !prev)
  }
  const handleConfirmPassword = () => {
    setConfirmPassword((prev) => !prev)
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

  const handleUploadProfileImage = async(e) =>{
    const data = await ImagetoBase64(e.target.files[0])
    console.log(data)

    setData((prev) => {
      return{
        ...prev,
        image : data
      }
    })
  }

// console.log(process.env.REACT_APP_SERVER_DOMAIN)
const handleSubmit = async(e) => {
  e.preventDefault();
  const { firstName, email, password, confirmPassword } = data;
  if(firstName && email && password && confirmPassword)
  {
    if(password === confirmPassword)
    { 
        const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/signup`,{
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        });

        const dataRes = await fetchData.json();
        console.log(dataRes)   
        toast(dataRes.message)

        if(dataRes.alert)
        {
          navigate('/login')
        }

    }
    else{
      alert('both password are not same')
    }
  }
  else{
    alert('please enter required field..')
  }
}
  return (
    <div className='p-3 md:p-4'>
      <div className='w-full max-w-sm bg-white m-auto flex items-center flex-col p-4'>
        <div className='w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md'>
            <img src={data.image ? data.image : loginSignupImage} className='w-full h-full'/>

            <label htmlFor='profileImage'>
              <div className='absolute bottom-0 h-1/3 bg-slate-500 bg-opacity-50 w-full text-center cursor-pointer'>
                <p className='text-sm p-1 text-white'>Upload</p>
              </div>
              <input type={"file"} id='profileImage' accept="image/*" className='hidden' onChange={handleUploadProfileImage}/>
            </label>
        </div>

        <form className='w-full py-3 flex flex-col' onSubmit={handleSubmit}>
            <label htmlFor='firstName'>First Name</label>
            <input type={"text"} id="firstName" name='firstName' className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300' value={data.firstName} onChange={handleOnChange}/>
             
            <label htmlFor='lastName'>Last Name</label>
            <input type={"text"} id="lastName" name='lastName' className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300' value={data.lastName} onChange={handleOnChange} />
        
            <label htmlFor='email'>Email</label>
            <input type={"email"} id="email" name='email' className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300' value={data.email} onChange={handleOnChange}/>       
        
            <label htmlFor='password'>Password</label>
            <div className='flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300' value={data.password} onChange={handleOnChange}>
              <input type={showPassword ? "text" : "password"} id="password" name='password' className=' w-full bg-slate-200 border-none outline-none'/>
              <span className='flex text-xl cursor-pointer' onClick={handleShowPassword} >{showPassword ? <BiShow/> : <BiHide/>}</span>
            </div>

            <label htmlFor='confirmPassword'>Confirm Password</label>
            <div className='flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300' value={data.confirmPassword} onChange={handleOnChange}>
              <input type={showConfirmPassword ? "text" : "password"} id="confirmPassword" name='confirmPassword' className=' w-full bg-slate-200 border-none outline-none'/>
              <span className='flex text-xl cursor-pointer' onClick={handleConfirmPassword} >{showConfirmPassword ? <BiShow/> : <BiHide/>}</span>
            </div>

            <button className='w-full max-w-[120px] m-auto bg-red-500 hover:bg-red-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full'>
              Sign Up
            </button>
            <p className='text-center text-sm mt-2'>Already have account ?{" "} <Link to={"/login"} className='text-red-500'>Login</Link></p>
        </form>

      </div>
    </div>
  )
}

export default Signup

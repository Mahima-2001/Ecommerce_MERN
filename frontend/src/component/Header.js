import React, { useState } from 'react'
import logo from '../assest/logo2.jpeg'
import { Link } from 'react-router-dom'
import { FaRegUserCircle } from "react-icons/fa";
import { BsCartFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux"
import { logoutRedux } from '../redux/userSlice';
import {toast} from "react-hot-toast"

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const userData = useSelector((state) => state.user)
  // console.log(userData.email)
  const dispatch = useDispatch()
  
  const handleShowMenu = () =>{
    setShowMenu(prev => !prev)
  }

  const handleLogout = () => {
     dispatch(logoutRedux())
     toast("Logout Successfully")
  }

  const cartItemNumber = useSelector((state)=>state.product.cartItem)

  return (
    <header className='fixed shadow-md w-full h-16 px-2 md:px-4 z-50 bg-white'>
        {/* desktop */}
        <div className='flex items-center h-full justify-between'> 
          <Link to={""}>
            <div className='h-10'>
              <img src={logo} className='h-full'/>
            </div>
          </Link>

          <div className='flex items-center gap-5 md:gap-7'>
             <nav className='gap-4 md:gap text-base md:text-lg hidden md:flex'>
                <Link to={""}>Home</Link>
                <Link to={"menu/6696bd0210743e028edf5fef"}>Menu</Link>
                <Link to={"about"}>About</Link>
                <Link to={"contact"}>Contact</Link>
             </nav>

             
             <div className='text-2xl text-slate-600 relative'>
              <Link to={"cart"}><BsCartFill/>
                <div className='absolute -top-1 -right-2 text-white bg-red-500 h-4 w-4 rounded-full m-0 p-0 text-xs text-center'>
                 {cartItemNumber.length}
                </div>
              </Link>
             </div>

             <div className='text-slate-600' onClick={handleShowMenu}>
              <div className='text-3xl cursor-pointer w-8 h-8 rounded-full overflow-hidden drop-showdow-md'>
                {userData.image ? <img src={userData.image} className='h-full w-full'/> : <FaRegUserCircle/>}
              </div>
              {
                showMenu && (
                <div className='absolute right-2 bg-white py-2 px-2 shadow drop-shadow flex flex-col min-w-[120px] text-center'>
                  {
                    userData.email === process.env.REACT_APP_ADMIN_EMAIL &&  <Link to={"newproduct"} className='whitespace-nowrap cursor-pointer'>New Product</Link>
                  }
                  {
                    userData.image ? <p className='cursor-pointer text-white bg-red-500 px-2 ' onClick={handleLogout}>Logout ({userData.firstName})</p> : <Link to={"login"} className='whitespace-nowrap cursor-pointer'>Login</Link>
                  }

                <nav className='text-base md:text-lg flex flex-col md:hidden'>
                  <Link to={""} className='px-2 py-1'>Home</Link>
                  <Link to={"menu/6696bd0210743e028edf5fef"} className='px-2 py-1'>Menu</Link>
                  <Link to={"about"} className='px-2 py-1'>About</Link>
                  <Link to={"contact"} className='px-2 py-1'>Contact</Link>
                </nav>
                </div>)
              }
             </div>

          </div>
        </div>

        {/* mobile */}
    </header>
  )
}

export default Header


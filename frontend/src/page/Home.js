import React, { useEffect, useRef, useState } from 'react'
import HomeCard from '../component/HomeCard'
import { useSelector } from 'react-redux'
import CardFeature from '../component/CardFeature'
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
import { CiForkAndKnife } from "react-icons/ci";
import FilterProduct from '../component/FilterProduct';
import AllProduct from '../component/AllProduct';

const Home = () => {
  const productData = useSelector((state) => state.product.productList)
  // console.log(productData)

  const homeProductCartList = productData.slice(0,4)
  const homeProductCartListVegetables = productData.filter(el => el.category === "vegetables", [] )
  // console.log(homeProductCartListVegetables)
  
  const loadingArray = new Array(4).fill(null);   
  const loadingArrayFeature = new Array(10).fill(null);

  const slideProductRef = useRef()
  const nextProduct = () => {
    slideProductRef.current.scrollLeft += 200 
  }

  const prevProduct = () => {
    slideProductRef.current.scrollLeft -= 200 
  }

 
  return (
    <div className='p-2 md:p-4'>
      <div className='md:flex gap-4py-2'>

        <div className='md:w-1/2 '>
          <div className='flex gap-3 bg-slate-300 w-36 px-2 items-center rounded-full'>
            <p className='text-sm font-medium text-slate-900'>Bike Delivery</p>
            <img src='https://cdn-icons-png.flaticon.com/512/2972/2972185.png' className='h-7'/>
          </div> 
          <h2 className='text-4xl md:text-6xl font-medium py-3'>The Fasted <br></br>Delivery in <span className='text-red-600 text'>Your <br></br>Home</span></h2>
          <p className='py-3 text-base'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
          <button className='font-bold bg-red-500 text-slate-200 px-4 py-2 rounded-md'>Order Now</button>
        </div>

        <div className='md:w-1/2 flex flex-wrap gap-3 p-4 justify-center'>
          {
            homeProductCartList[0] ? homeProductCartList.map(el => {
              return(
                <HomeCard 
                key={el._id}
                id={el._id}
                image = {el.image}
                name = {el.name}
                price = {el.price}
                category = {el.category}/>
              )
            }) 
            :
            loadingArray.map((e1, index) => {
              return(
                <HomeCard 
                key={index}
                loading={"Loading..."}/>
              )
            })
          }
        </div>
      </div>

      <div className=''>
          <div className='flex w-full items-center'>
            <h2 className='font-bold text-2xl text-slate-800 mb-4'>Fresh vegetables</h2>
            <div className='ml-auto flex gap-4 '>
              <button onClick={prevProduct} className='bg-slate-300 hover-bg-slate-400 text-lg p-1 rounded'><GrPrevious/></button>
              <button onClick={nextProduct} className='bg-slate-300 hover-bg-slate-400 text-lg p-1 rounded'><GrNext/></button>
            </div>
          </div>
          <div className='flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all' ref={slideProductRef}>
            {
                 homeProductCartListVegetables ?  homeProductCartListVegetables.map(el => {
                    return(
                      <CardFeature 
                    key={el._id}
                    id={el._id}
                    image = {el.image}
                    name = {el.name}
                    price = {el.price}
                    category = {el.category}/> 
                    )
                  })
                  :
                  loadingArrayFeature.map((e1,index) => {
                  <CardFeature loading={'Loading...'} key={index}/>
                })          
                  
            }
          </div>
      </div>
        <AllProduct heading={"Your Product"}/>
    </div>
  )
}

export default Home

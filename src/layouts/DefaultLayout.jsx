import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'

const DefaultLayout = () => {
  return (
    <div className='default-layout p-3'>
      <Navbar/>
      <Outlet />
    </div>
  )
}

export default DefaultLayout
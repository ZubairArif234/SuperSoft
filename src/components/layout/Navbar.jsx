import React from 'react'
import profile from "../../assets/profile.png"

const Navbar = () => {
  return (
    <div className='navbar  p-3 d-flex justify-content-between align-items-center'>
      <p className='mb-0 page-name'>Students</p>
      <div className='d-flex align-items-center'>
        <img src={profile} width={40}/>
        <div className='ms-2'>
          <p className='mb-0 user-name'>Zubair arif</p>
          <p className='mb-0 user-email'>zubarif234@gmail.com</p>
        </div>
      </div>
    </div>
  )
}

export default Navbar
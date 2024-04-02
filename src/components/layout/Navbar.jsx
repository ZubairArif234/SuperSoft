import React from 'react'

const Navbar = () => {
  return (
    <div className='navbar  p-3 d-flex justify-content-between align-items-center'>
      <p className='mb-0 page-name'>Students</p>
      <div className='d-flex align-items-center'>
        <img/>
        <div>
          <p className='mb-0 user-name'>Zubair arif</p>
          <p className='mb-0 user-email'>zubarif234@gmail.com</p>
        </div>
      </div>
    </div>
  )
}

export default Navbar
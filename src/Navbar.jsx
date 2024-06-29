import React from 'react'
import { Link } from 'react-router-dom' 
import './App.css'

const Navbar = () => {
  return (
    <div className='nav'> 
      <Link to='/add' class='l1'>Add Note</Link>
      <Link to='/all' className='l1' >All Notes</Link>
      <Link to='/search'className='l1' >Search Note</Link>
    </div>
  )
}

export default Navbar
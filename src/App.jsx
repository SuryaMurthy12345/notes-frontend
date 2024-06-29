import React from 'react'
import Navbar from './Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Addnote from './Addnote'
import Notelist from './Notelist'
import Searchnote from './Searchnote' 
import './App.css'

const App = () => {
  return (
    <div>   
    
      <BrowserRouter> 
      <Navbar/> 
      <Routes> 
        <Route path='/add' element={<Addnote/>} />  
        <Route path='/all' element={<Notelist/>} /> 
        <Route path='/search' element={<Searchnote/>} /> 
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
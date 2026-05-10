import React from 'react'
import {BrowserRouter,Routes,Route } from "react-router"
import Registration from './pages/Registration'
import Login from './pages/Login'
import OTPVerification from './pages/OTPverification'
import Dashboard from './pages/Dashboard'
import Project from './pages/project'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/registration' element={<Registration />} />
        <Route path='/login' element={<Login />} />
        <Route path='/email-verify' element={<OTPVerification />} />
        <Route path='/' element={<Dashboard />} />
        <Route path='/:slug' element={<Project />} />
      </Routes>
   </BrowserRouter>
  )
}

export default App;
import React from "react"
import { Router,Route,Routes,Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import Home from "../pages/Home"
import SignUp from "../pages/SignUp"
import Login from "../pages/Login"
import Dashboard from "../pages/Dashboard"
import { Toaster } from 'react-hot-toast';
import NotFound from "../pages/NotFound"
import Protectedr from "../routes/Protectedr"
import Cursor from "../motion/cursor"
const App = () => {
  return (
    <div>
        <style>{`
  body, * {
    cursor: none !important;
  }
`}</style>

        <Cursor />
       
      <Navbar/>
    <Toaster position="top-right" reverseOrder={false} />
         <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<Login/>} />
         <Route path="/signup" element={<SignUp/>} />
        <Route path="/dashboard" element={<Protectedr/>}/>
      </Routes>
    </div>
  )
}

export default App



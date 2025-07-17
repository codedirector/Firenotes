import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/Authcontext'
import Dashboard from '../pages/Dashboard'
const Protectedr = () => {
  const user=useAuth();
  if(!user.user)
  {
    return <Navigate to="/login"/>
  }
  return (
  <Dashboard/>
  )
}

export default Protectedr

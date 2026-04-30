import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import useAuthStore from '../../store/useAuthStore'

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuthStore()
  if (!isLoggedIn) return <Navigate to="/login" replace />
  return children ? children : <Outlet />
}

export default ProtectedRoute
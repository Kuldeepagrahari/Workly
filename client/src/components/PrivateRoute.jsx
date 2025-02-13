"use client"

import React from "react"
import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/register" state={{ from: location }} replace />
  }

  return children
}

export default PrivateRoute


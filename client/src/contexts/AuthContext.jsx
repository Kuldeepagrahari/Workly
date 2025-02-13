"use client"

import { createContext, useState, useContext, useEffect } from "react"
import axios from "axios"

const AuthContext = createContext(undefined)

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"))
  const [userId, setUserId] = useState(localStorage.getItem("userId"))
  const [username, setUsername] = useState("")
  const login = (token, userId, user) => {
    setToken(token)
    setUserId(userId)
    setUsername(user)
    localStorage.setItem("token", token)
    localStorage.setItem("userId", userId)
    console.log(user)
    
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
  }

  const logout = () => {
    setToken(null)
    setUserId(null)
    localStorage.removeItem("token")
    localStorage.removeItem("userId")
    delete axios.defaults.headers.common["Authorization"]
  }

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
    }
  }, [token])

  return (
    <AuthContext.Provider value={{ token, username, userId, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

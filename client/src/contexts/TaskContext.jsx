"use client"

import React, { createContext, useState, useContext, useEffect } from "react"
import axios from "axios"
import { useAuth } from "./AuthContext"

const TaskContext = createContext(undefined)

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([])
  const { userId, isAuthenticated } = useAuth()

  const fetchTasks = async () => {
    if (isAuthenticated && userId) {
      try {
        const response = await axios.get(`http://localhost:5000/api/tasks/${userId}`)
        setTasks(response.data)
        console.log(response)
  
      } catch (error) {
        console.error("Error fetching tasks:", error)
      }
    }
  }

  const addTask = async (task) => {
    try {
      const response = await axios.post("http://localhost:5000/api/tasks", task)
      setTasks([...tasks, response.data])
    } catch (error) {
      console.error("Error adding task:", error)
    }
  }

  const updateTask = async (taskId, updates) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/tasks/${taskId}`, updates)
      setTasks(tasks.map((task) => (task._id === taskId ? response.data : task)))
    } catch (error) {
      console.error("Error updating task:", error)
    }
  }

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`)
      setTasks(tasks.filter((task) => task._id !== taskId))
    } catch (error) {
      console.error("Error deleting task:", error)
    }
  }

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     fetchTasks()
  //   }
  // }, []) // Removed fetchTasks from dependencies to avoid unnecessary re-renders

  return (
    <TaskContext.Provider value={{ tasks, fetchTasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  )
}

export const useTask = () => {
  const context = useContext(TaskContext)
  if (!context) {
    throw new Error("useTask must be used within a TaskProvider")
  }
  return context
}


import React, { useState, useEffect } from "react"
import { Container, Typography, Box, Button, Switch } from "@mui/material"
import { motion } from "framer-motion"
import { useAuth } from "../contexts/AuthContext.jsx"
import { useTask } from "../contexts/TaskContext.jsx"
import TaskList from "./TaskList.jsx"
import TaskForm from "./TaskForm.jsx"
import Stats from "./Stats.jsx"

const Dashboard = ({ setDarkMode }) => {
  
  const { username } = useAuth()    
  const { logout } = useAuth()
  const { tasks, fetchTasks } = useTask()
  const [showForm, setShowForm] = useState(false)
  const [darkMode, setLocalDarkMode] = useState(false)

  useEffect(() => {
    fetchTasks()
  }, []) // Added fetchTasks to dependencies

  const handleDarkModeToggle = () => {
    setLocalDarkMode(!darkMode)
    setDarkMode(!darkMode)
  }

  return (
    <Container style={{width:"100vw"}}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", my: 4 }}>
        <Typography variant="h4" component="h1">
          <i>Workly</i>
        </Typography>
        <Box>
          <Switch checked={darkMode} onChange={handleDarkModeToggle} />
          <Button onClick={logout} variant="outlined">
            Logout
          </Button>
        </Box>
      </Box>
      <h1>Hello {username}!</h1>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Stats tasks={tasks} />
      </motion.div>
      <Box sx={{ my: 4 }}>
        <Button onClick={() => setShowForm(!showForm)} variant="contained">
          {showForm ? "Hide Form" : "Add New Task"}
        </Button>
      </Box>
      {showForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <TaskForm onClose={() => setShowForm(false)} />
        </motion.div>
      )}
      <TaskList tasks={tasks} />
    </Container>
  )
}

export default Dashboard

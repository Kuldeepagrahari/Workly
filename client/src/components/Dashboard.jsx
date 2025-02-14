
// import React, { useState, useEffect } from "react"
// import { Container, Typography, Box, Button, Switch } from "@mui/material"
// import { motion } from "framer-motion"
// import { useAuth } from "../contexts/AuthContext.jsx"
// import { useTask } from "../contexts/TaskContext.jsx"
// import TaskList from "./TaskList.jsx"
// import TaskForm from "./TaskForm.jsx"
// import Stats from "./Stats.jsx"

// const Dashboard = ({ setDarkMode }) => {
  
//   const { username } = useAuth()    
//   const { logout } = useAuth()
//   const { tasks, fetchTasks } = useTask()
//   const [showForm, setShowForm] = useState(false)
//   const [darkMode, setLocalDarkMode] = useState(false)

//   useEffect(() => {
//     fetchTasks()
//   }, []) // Added fetchTasks to dependencies

//   const handleDarkModeToggle = () => {
//     setLocalDarkMode(!darkMode)
//     setDarkMode(!darkMode)
//   }

//   return (
//     <Container style={{width:"100vw"}}>
//       <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", my: 4 }}>
//         <Typography variant="h4" component="h1">
//           <i>Workly</i>
//         </Typography>
//         <Box>
//           <Switch checked={darkMode} onChange={handleDarkModeToggle} />
//           <Button onClick={logout} variant="outlined">
//             Logout
//           </Button>
//         </Box>
//       </Box>
//       <h1>Hello {username}!</h1>
//       <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
//         <Stats tasks={tasks} />
//       </motion.div>
//       <Box sx={{ my: 4 }}>
//         <Button onClick={() => setShowForm(!showForm)} variant="contained">
//           {showForm ? "Hide Form" : "Add New Task"}
//         </Button>
//       </Box>
//       {showForm && (
//         <motion.div
//           initial={{ opacity: 0, height: 0 }}
//           animate={{ opacity: 1, height: "auto" }}
//           exit={{ opacity: 0, height: 0 }}
//           transition={{ duration: 0.3 }}
//         >
//           <TaskForm onClose={() => setShowForm(false)} />
//         </motion.div>
//       )}
//       <TaskList tasks={tasks} />
//     </Container>
//   )
// }

// export default Dashboard
"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import { motion } from "framer-motion"
import { FiSun, FiMoon } from "react-icons/fi"
import DailyTasks from "./DailyTasks"
import AllTasks from "./AllTasks"
import Statistics from "./Statistics"
import TaskForm from "./TaskForm"
import styles from "../styles//dashboard.module.css"

const Dashboard = () => {
  const { logout } = useAuth()
  const [showForm, setShowForm] = useState(false)
  const [activeTab, setActiveTab] = useState("daily")
  const [darkMode, setDarkMode] = useState(false)
    // const { tasks, fetchTasks } = useTask()
  const { username } = useAuth()    

  useEffect(() => {
    const root = document.documentElement
    if (darkMode) {
      root.classList.add("dark-mode")
    } else {
      root.classList.remove("dark-mode")
    }
  }, [darkMode])

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode)
  }

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        
        <h1 style={{color:"white"}}><span style={{color:"gray", fontWeight:"bold"}}>Workly</span><br />Hello {username}!</h1>
        <div className={styles.headerActions}>
          <button onClick={handleDarkModeToggle} className={styles.modeToggle}>
            {darkMode ? <FiSun /> : <FiMoon />}
          </button>
          <button onClick={logout} className={styles.logoutButton}>
            Logout
          </button>
        </div>
      </header>
      <nav className={styles.nav}>
        <button onClick={() => setActiveTab("daily")} className={activeTab === "daily" ? styles.activeTab : ""}>
          Daily Tasks
        </button>
        <button onClick={() => setActiveTab("all")} className={activeTab === "all" ? styles.activeTab : ""}>
          All Tasks
        </button>
        <button onClick={() => setActiveTab("stats")} className={activeTab === "stats" ? styles.activeTab : ""}>
          Statistics
        </button>
      </nav>
      <main className={styles.main}>
        {activeTab === "daily" && <DailyTasks />}
        {activeTab === "all" && <AllTasks />}
        {activeTab === "stats" && <Statistics />}
      </main>
      <button className={styles.addButton} onClick={() => setShowForm(true)}>
        +
      </button>
      {showForm && (
        <motion.div className={styles.modal} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className={styles.modalContent}>
            <button className={styles.closeButton} onClick={() => setShowForm(false)}>
              &times;
            </button>
            <TaskForm onClose={() => setShowForm(false)} />
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default Dashboard


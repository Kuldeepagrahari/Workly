"use client"

import { useState, useEffect } from "react"
import { useTask } from "../contexts/TaskContext"
import { motion, AnimatePresence } from "framer-motion"
import { FiCheck, FiClock } from "react-icons/fi"
import styles from "../styles/dailyTasks.module.css"

const DailyTasks = () => {
  const { tasks, updateTask } = useTask()
  const [dailyTasks, setDailyTasks] = useState([])

  useEffect(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const filteredTasks = tasks.filter((task) => {
      const taskDate = new Date(task.dueDate)
      taskDate.setHours(0, 0, 0, 0)
      return (
        taskDate.getTime() === today.getTime() ||
        task.recurrence === "Daily" ||
        (task.recurrence === "Weekly" && taskDate.getDay() === today.getDay())
      )
    })

    setDailyTasks(filteredTasks)
  }, [tasks])

  const handleToggleComplete = (taskId, currentStatus) => {
    updateTask(taskId, { completionStatus: !currentStatus })
  }

  return (
    <div className={styles.dailyTasks}>
      <h2>Today's Tasks</h2>
      <AnimatePresence>
        {dailyTasks.length === 0 ? (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            No tasks for today
          </motion.p>
        ) : (
          <ul>
            {dailyTasks.map((task) => (
              <motion.li
                key={task._id}
                className={styles.taskItem}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <button
                  className={`${styles.checkbox} ${task.completionStatus ? styles.completed : ""}`}
                  onClick={() => handleToggleComplete(task._id, task.completionStatus)}
                >
                  {task.completionStatus && <FiCheck />}
                </button>
                <span className={task.completionStatus ? styles.completedText : ""}>{task.title}</span>
                <span className={styles.category}>{task.category}</span>
                <span className={styles.dueTime}>
                  <FiClock /> {task.dueTime}
                </span>
              </motion.li>
            ))}
          </ul>
        )}
      </AnimatePresence>
    </div>
  )
}

export default DailyTasks


"use client"

import { useState } from "react"
import { useTask } from "../contexts/TaskContext"
import { motion, AnimatePresence } from "framer-motion"
import { FiCheck, FiClock, FiCalendar, FiTrash2, FiEdit } from "react-icons/fi"
import styles from "../styles/allTasks.module.css"

const AllTasks = () => {
  const { tasks, updateTask, deleteTask } = useTask()
  const [filter, setFilter] = useState("all")
  const [editingTask, setEditingTask] = useState(null)

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true
    if (filter === "completed") return task.completionStatus
    if (filter === "pending") return !task.completionStatus
    return task.category.toLowerCase() === filter
  })

  const handleToggleComplete = (taskId, currentStatus) => {
    updateTask(taskId, { completionStatus: !currentStatus })
  }

  const handleDelete = (taskId) => {
    deleteTask(taskId)
  }

  const handleEdit = (task) => {
    setEditingTask(task)
  }

  const handleUpdate = (e) => {
    e.preventDefault()
    updateTask(editingTask._id, editingTask)
    setEditingTask(null)
  }

  return (
    <div className={styles.allTasks}>
      <h2>All Tasks</h2>
      <div className={styles.filters}>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("pending")}>Pending</button>
        <button onClick={() => setFilter("coding")}>Coding</button>
        <button onClick={() => setFilter("personal")}>Personal</button>
        <button onClick={() => setFilter("academics")}>Academics</button>
        <button onClick={() => setFilter("health")}>Health</button>
      </div>
      <AnimatePresence>
        {filteredTasks.map((task) => (
          <motion.div
            key={task._id}
            className={styles.taskItem}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {editingTask && editingTask._id === task._id ? (
              <form onSubmit={handleUpdate} className={styles.editForm}>
                <input
                  type="text"
                  value={editingTask.title}
                  onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                />
                <input
                  type="date"
                  value={new Date(editingTask.dueDate).toISOString().split("T")[0]}
                  onChange={(e) => setEditingTask({ ...editingTask, dueDate: new Date(e.target.value) })}
                />
                <input
                  type="time"
                  value={editingTask.dueTime}
                  onChange={(e) => setEditingTask({ ...editingTask, dueTime: e.target.value })}
                />
                <button type="submit">Save</button>
                <button type="button" onClick={() => setEditingTask(null)}>
                  Cancel
                </button>
              </form>
            ) : (
              <>
                <button
                  className={`${styles.checkbox} ${task.completionStatus ? styles.completed : ""}`}
                  onClick={() => handleToggleComplete(task._id, task.completionStatus)}
                >
                  {task.completionStatus && <FiCheck />}
                </button>
                <span className={task.completionStatus ? styles.completedText : ""}>{task.title}</span>
                <span className={styles.category}>{task.category}</span>
                <span className={styles.dueDate}>
                  <FiCalendar /> {new Date(task.dueDate).toLocaleDateString()}
                </span>
                <span className={styles.dueTime}>
                  <FiClock /> {task.dueTime}
                </span>
                <button className={styles.editButton} onClick={() => handleEdit(task)}>
                  <FiEdit />
                </button>
                <button className={styles.deleteButton} onClick={() => handleDelete(task._id)}>
                  <FiTrash2 />
                </button>
              </>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default AllTasks


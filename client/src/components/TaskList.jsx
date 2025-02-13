"use client"

import { useTask } from "../contexts/TaskContext.jsx"
import styles from "../styles/taskList.module.css"
import { FaEdit, FaTrash } from "react-icons/fa"
import { motion } from "framer-motion"

const TaskList = ({ tasks }) => {
  const { updateTask, deleteTask } = useTask()

  const handleToggleComplete = (taskId, currentStatus) => {
    updateTask(taskId, { completionStatus: !currentStatus })
  }

  const handleDelete = (taskId) => {
    deleteTask(taskId)
  }

  return (
    <div className={styles.taskList}>
      {tasks.map((task) => (
        <motion.div 
          key={task._id} 
          className={styles.taskItem}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.input
            type="checkbox"
            checked={task.completionStatus}
            onChange={() => handleToggleComplete(task._id, task.completionStatus)}
            className={styles.checkbox}
            whileTap={{ scale: 0.8 }}
            style={{ background: "white", border: "1px solid #000", width: "20px", height: "20px" }}
          />
          <div className={styles.taskContent}>
            <h3>{task.title}</h3>
            <p>{`${task.category} | ${task.recurrence} | Due: ${new Date(task.dueDate).toLocaleDateString()}`}</p>
          </div>
          <div className={styles.taskActions}>
            <button className={styles.editButton}>
              <FaEdit size={18}  />
            </button>
            <button className={styles.deleteButton} onClick={() => handleDelete(task._id)}>
              <FaTrash size={18}  />
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default TaskList

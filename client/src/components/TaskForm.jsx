// "use client"

// import { useState } from "react"
// import { useTask } from "../contexts/TaskContext.jsx"
// import styles from "../styles/taskForm.module.css"

// const TaskForm = ({ onClose }) => {
//   const [title, setTitle] = useState("")
//   const [category, setCategory] = useState("")
//   const [dueDate, setDueDate] = useState("")
//   const [recurrence, setRecurrence] = useState("")
//   const { addTask } = useTask()

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     if (title && category && dueDate && recurrence) {
//       addTask({
//         title,
//         category,
//         dueDate,
//         recurrence,
//         completionStatus: false,
//       })
//       onClose()
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit} className={styles.form}>
//       <div className={styles.formGroup}>
//         <label htmlFor="title">Title</label>
//         <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
//       </div>
//       <div className={styles.formGroup}>
//         <label htmlFor="category">Category</label>
//         <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} required>
//           <option value="">Select a category</option>
//           <option value="Coding">Coding</option>
//           <option value="Personal">Personal</option>
//           <option value="Academics">Academics</option>
//           <option value="Health">Health</option>
//         </select>
//       </div>
//       <div className={styles.formGroup}>
//         <label htmlFor="dueDate">Due Date</label>
//         <input id="dueDate" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
//       </div>
//       <div className={styles.formGroup}>
//         <label htmlFor="recurrence">Recurrence</label>
//         <select id="recurrence" value={recurrence} onChange={(e) => setRecurrence(e.target.value)} required>
//           <option value="">Select recurrence</option>
//           <option value="Daily">Daily</option>
//           <option value="Weekly">Weekly</option>
//           <option value="One-time">One-time</option>
//         </select>
//       </div>
//       <button type="submit" className={styles.submitButton}>
//         Add Task
//       </button>
//     </form>
//   )
// }

// export default TaskForm

"use client"

import { useState } from "react"
import { useTask } from "../contexts/TaskContext"
import { motion } from "framer-motion"
import { FiClock, FiCalendar, FiRepeat, FiTag } from "react-icons/fi"
import styles from "../styles/taskForm.module.css"

const TaskForm = ({ onClose }) => {
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [dueTime, setDueTime] = useState("")
  const [recurrence, setRecurrence] = useState("")
  const { addTask } = useTask()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (title && category && dueDate && dueTime && recurrence) {
      const dueDateTime = new Date(`${dueDate}T${dueTime}`)
      addTask({
        title,
        category,
        dueDate: dueDateTime,
        dueTime,
        recurrence,
        completionStatus: false,
      })
      onClose()
    }
  }

  return (
    <motion.form
      className={styles.form}
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className={styles.formGroup}>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Task Title" required />
      </div>
      <div className={styles.formGroup}>
        <FiTag className={styles.icon} />
        <select value={category} onChange={(e) => setCategory(e.target.value)} required>
          <option value="">Select Category</option>
          <option value="Coding">Coding</option>
          <option value="Personal">Personal</option>
          <option value="Academics">Academics</option>
          <option value="Health">Health</option>
        </select>
      </div>
      <div className={styles.formGroup}>
        <FiCalendar className={styles.icon} />
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
      </div>
      <div className={styles.formGroup}>
        <FiClock className={styles.icon} />
        <input type="time" value={dueTime} onChange={(e) => setDueTime(e.target.value)} required />
      </div>
      <div className={styles.formGroup}>
        <FiRepeat className={styles.icon} />
        <select value={recurrence} onChange={(e) => setRecurrence(e.target.value)} required>
          <option value="">Select Recurrence</option>
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
          <option value="One-time">One-time</option>
        </select>
      </div>
      <button type="submit" className={styles.submitButton}>
        Add Task
      </button>
    </motion.form>
  )
}

export default TaskForm


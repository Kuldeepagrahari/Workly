"use client"

import { useState, useEffect } from "react"
import { useTask } from "../contexts/TaskContext"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { motion } from "framer-motion"
import styles from "../styles/statistics.module.css"

const Statistics = () => {
  const { tasks } = useTask()
  const [dateStats, setDateStats] = useState([])
  const [categoryStats, setCategoryStats] = useState({})

  useEffect(() => {
    const stats = {}
    const categories = {}

    tasks.forEach((task) => {
      const date = new Date(task.dueDate).toLocaleDateString()
      if (!stats[date]) {
        stats[date] = { total: 0, completed: 0 }
      }
      stats[date].total++
      if (task.completionStatus) {
        stats[date].completed++
      }

      if (!categories[task.category]) {
        categories[task.category] = { total: 0, completed: 0 }
      }
      categories[task.category].total++
      if (task.completionStatus) {
        categories[task.category].completed++
      }
    })

    const formattedStats = Object.entries(stats).map(([date, data]) => ({
      date,
      completed: (data.completed / data.total) * 100,
      pending: ((data.total - data.completed) / data.total) * 100,
    }))

    setDateStats(formattedStats)
    setCategoryStats(categories)
  }, [tasks])

  return (
    <motion.div
      className={styles.statistics}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Task Statistics</h2>
      <div className={styles.chartContainer}>
        <h3>Completion Rate by Date</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dateStats}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="completed" stackId="a" fill="var(--chart-completed)" name="Completed %" />
            <Bar dataKey="pending" stackId="a" fill="var(--chart-pending)" name="Pending %" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className={styles.categoryStats}>
        <h3>Category Statistics</h3>
        {Object.entries(categoryStats).map(([category, data]) => (
          <motion.div
            key={category}
            className={styles.categoryItem}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h4>{category}</h4>
            <p>Total Tasks: {data.total}</p>
            <p>Completed: {data.completed}</p>
            <p>Completion Rate: {((data.completed / data.total) * 100).toFixed(2)}%</p>
            <div className={styles.progressBar}>
              <div className={styles.progress} style={{ width: `${(data.completed / data.total) * 100}%` }}></div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default Statistics


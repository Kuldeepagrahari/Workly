import express from "express"
import Task from "../models/Task.js"
import { auth } from "../middleware/auth.js"

const router = express.Router()

router.get("/:userId", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.userId })

    const totalTasks = tasks.length
    const completedTasks = tasks.filter((task) => task.completionStatus).length
    const pendingTasks = totalTasks - completedTasks

    const categoryStats = tasks.reduce((acc, task) => {
      acc[task.category] = (acc[task.category] || 0) + (task.completionStatus ? 1 : 0)
      return acc
    }, {})

    res.json({
      totalTasks,
      completedTasks,
      pendingTasks,
      completionPercentage: totalTasks ? (completedTasks / totalTasks) * 100 : 0,
      categoryStats,
    })
  } catch (error) {
    res.status(500).json({ message: "Error fetching stats", error: error.message })
  }
})

export default router


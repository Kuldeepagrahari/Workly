import express from "express"
import Task from "../models/Task.js"
import { auth } from "../middleware/auth.js"

const router = express.Router()

router.get("/:userId", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.userId })
    res.json(tasks)
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error: error.message })
  }
})

router.post("/", auth, async (req, res) => {
  try {
    const task = new Task({ ...req.body, user: req.userId })
    await task.save()
    res.status(201).json(task)
  } catch (error) {
    res.status(500).json({ message: "Error creating task", error: error.message })
  }
})

router.put("/:taskId", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate({ _id: req.params.taskId, user: req.userId }, req.body, { new: true })
    if (!task) {
      return res.status(404).json({ message: "Task not found" })
    }
    res.json(task)
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error: error.message })
  }
})

router.delete("/:taskId", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.taskId, user: req.userId })
    if (!task) {
      return res.status(404).json({ message: "Task not found" })
    }
    res.json({ message: "Task deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error: error.message })
  }
})

export default router


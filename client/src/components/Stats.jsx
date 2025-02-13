"use client"

import { Typography, Box, Paper } from "@mui/material"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { motion } from "framer-motion"

const Stats = ({ tasks }) => {
  const totalTasks = tasks.length
  const completedTasks = tasks.filter((task) => task.completionStatus).length
  const pendingTasks = totalTasks - completedTasks

  const categoryStats = tasks.reduce((acc, task) => {
    acc[task.category] = (acc[task.category] || 0) + 1
    return acc
  }, {})

  const pieData = [
    { name: "Completed", value: completedTasks },
    { name: "Pending", value: pendingTasks },
  ]

  const COLORS = ["#4CAF50", "#F44336"]

  return (
    <Paper
      elevation={5}
      sx={{
        p: 4,
        mb: 4,
        borderRadius: "12px",
        background: "linear-gradient(135deg, #1e3c72, #2a5298)",
        color: "white",
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", textAlign: "center" }}>
          Task Statistics
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box>
            <Typography sx={{ fontSize: "1.1rem" }}>Total Tasks: {totalTasks}</Typography>
            <Typography sx={{ fontSize: "1.1rem", color: "#4CAF50" }}>
              Completed Tasks: {completedTasks}
            </Typography>
            <Typography sx={{ fontSize: "1.1rem", color: "#F44336" }}>
              Pending Tasks: {pendingTasks}
            </Typography>
            <Typography sx={{ fontSize: "1.1rem", fontWeight: "bold", mt: 1 }}>
              Completion Rate: {totalTasks > 0 ? ((completedTasks / totalTasks) * 100).toFixed(2) : 0}%
            </Typography>
          </Box>
          <Box
            sx={{
              width: 220,
              height: 220,
              background: "rgba(255, 255, 255, 0.1)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backdropFilter: "blur(10px)",
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={50}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </Box>
        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            Tasks by Category:
          </Typography>
          {Object.entries(categoryStats).map(([category, count]) => (
            <Typography key={category} sx={{ fontSize: "1rem", mt: 0.5 }}>
              {category}: {count}
            </Typography>
          ))}
        </Box>
      </motion.div>
    </Paper>
  )
}

export default Stats

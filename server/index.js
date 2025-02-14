import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import authRoutes from "./routes/auth.js"
import taskRoutes from "./routes/tasks.js"
import statsRoutes from "./routes/stats.js"

dotenv.config()

const app = express()

app.use(
    cors({
      origin: "https://workly-client.onrender.com", // Include the protocol
      credentials: true, // If using cookies or authentication headers
    })
  );
app.use(express.json())
// console.log(process.env.MONGODB_URI)
// Connect to MongoDB

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err))

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/tasks", taskRoutes)
app.use("/api/stats", statsRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))


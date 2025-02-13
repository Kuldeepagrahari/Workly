import mongoose from "mongoose"

const taskSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    category: { type: String, enum: ["Coding", "Personal", "Academics", "Health"], required: true },
    dueDate: { type: Date },
    recurrence: { type: String, enum: ["Daily", "Weekly", "One-time"], required: true },
    completionStatus: { type: Boolean, default: false },
  },
  { timestamps: true },
)

export default mongoose.model("Task", taskSchema)


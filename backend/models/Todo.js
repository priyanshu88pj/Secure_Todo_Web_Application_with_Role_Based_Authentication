import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true, maxLength: 100 },
  description: { type: String, maxLength: 500 },
  dueDate: { type: Date },
  category: { type: String, enum: ["Urgent", "Non-Urgent"], required: true },
  completed: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

export default mongoose.model("Todo", todoSchema);

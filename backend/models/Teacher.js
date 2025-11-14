import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  subject: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Teacher", teacherSchema);


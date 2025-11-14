// models/FeeStructure.js
import mongoose from "mongoose";

const FeeItemSchema = new mongoose.Schema({
  key: String,             // e.g. "tuition", "lab", "transport"
  title: String,           // displayed name
  amount: Number,          // base amount (number)
  description: String,     // HTML string (ReactQuill)
});

const FeeStructureSchema = new mongoose.Schema({
  academicYear: { type: String, default: "2025-26" },
  notes: { type: String, default: "" }, // overview HTML
  items: { type: [FeeItemSchema], default: [] },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("FeeStructure", FeeStructureSchema);







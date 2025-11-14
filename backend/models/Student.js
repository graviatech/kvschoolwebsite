// models/Student.js
import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  admissionNo: String,
  name: String,
  classApplied: String,
  guardianName: String,
  phone: String,
  email: String,
  // student-specific overrides (optional)
  feeOverrides: {
    // { tuition: 1000 } to override specific item for student
    type: Map,
    of: Number,
    default: {}
  }
});

export default mongoose.model("Student", StudentSchema);


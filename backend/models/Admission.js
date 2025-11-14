

import mongoose from "mongoose";

const admissionSchema = new mongoose.Schema({
  admissionNo: { type: String, unique: true },
  studentName: { type: String, required: true },
  parentName: { type: String },
  classApplied: { type: String },
  age: { type: String },
  phone: { type: String },
  email: { type: String },
  address: { type: String },
  photo: { type: String }, // image path
  createdAt: { type: Date, default: Date.now },
  feeOverrides: {
  type: Map,
  of: Number,
  default: {},
},

});

export default mongoose.model("Admission", admissionSchema);




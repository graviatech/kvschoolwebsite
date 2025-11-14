import mongoose from "mongoose";

const contactInfoSchema = new mongoose.Schema({
  content: { type: String, required: true }, // React Quill HTML content
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model("ContactInfo", contactInfoSchema);


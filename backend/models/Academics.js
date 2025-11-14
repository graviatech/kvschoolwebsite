// import mongoose from "mongoose";

// const AcademicsSchema = new mongoose.Schema({
//   curriculum: { type: String, default: "" },
//   subjects: { type: String, default: "" },
//   faculty: { type: String, default: "" },
//   examination: { type: String, default: "" },
// });

// export default mongoose.model("Academics", AcademicsSchema);



import mongoose from "mongoose";

const AcademicsSchema = new mongoose.Schema({
  pedagogy: { type: String, default: "" },
  annualCalendar: { type: String, default: "" },
  result: { type: String, default: "" },
  curriculum: { type: String, default: "" },
  subjects: { type: String, default: "" },
  faculty: { type: String, default: "" },
  examination: { type: String, default: "" },
  examinationResult: { type: String, default: "" },
});

export default mongoose.model("Academics", AcademicsSchema);

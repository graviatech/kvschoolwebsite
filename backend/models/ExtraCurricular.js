// // models/ExtraCurricular.js
// import mongoose from "mongoose";

// const extraCurricularSchema = new mongoose.Schema({
//   foreignLanguages: { type: String, default: "<p>Details...</p>" },
//   ethics: { type: String, default: "<p>Details...</p>" },
//   sports: { type: String, default: "<p>Details...</p>" },
//   musicDance: { type: String, default: "<p>Details...</p>" },
//   artCraft: { type: String, default: "<p>Details...</p>" },
//   tourTrips: { type: String, default: "<p>Details...</p>" },
// }, { timestamps: true });

// export default mongoose.model("ExtraCurricular", extraCurricularSchema);






import mongoose from "mongoose";

const extraCurricularSchema = new mongoose.Schema({
  sections: {
    type: Map,
    of: new mongoose.Schema({
      title: String,
      content: String
    }),
    default: {}
  }
});

export default mongoose.model("ExtraCurricular", extraCurricularSchema);

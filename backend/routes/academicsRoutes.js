// import express from "express";
// import Academics from "../models/Academics.js";
// // import { verifyAdminToken } from "../middleware/auth.js"; // optional if you use admin auth

// const router = express.Router();

// // Get academics data
// router.get("/", async (req, res) => {
//   try {
//     const data = await Academics.findOne();
//     res.json(data || {});
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Update academics data
// router.put("/", async (req, res) => {
//   try {
//     const { curriculum, subjects, faculty, examination } = req.body;
//     let data = await Academics.findOne();
//     if (!data) data = new Academics({});
//     data.curriculum = curriculum;
//     data.subjects = subjects;
//     data.faculty = faculty;
//     data.examination = examination;
//     await data.save();
//     res.json({ message: "Academics content updated successfully!" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// export default router;





// import express from "express";
// import Academics from "../models/Academics.js";

// const router = express.Router();

// // Get all sections
// router.get("/", async (req, res) => {
//   try {
//     const data = await Academics.findOne();
//     res.json(data || {});
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Update sections
// router.put("/", async (req, res) => {
//   try {
//     let data = await Academics.findOne();
//     if (!data) data = new Academics({});
//     Object.keys(req.body).forEach(key => {
//       data[key] = req.body[key];
//     });
//     await data.save();
//     res.json({ message: "Academics updated successfully!", data });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// export default router;










import express from "express";
import Academics from "../models/Academics.js";

const router = express.Router();

// Get all academics
router.get("/", async (req, res) => {
  try {
    const data = await Academics.findOne();
    res.json(data || {});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update academics
router.put("/", async (req, res) => {
  try {
    let data = await Academics.findOne();
    if (!data) data = new Academics({});
    Object.keys(req.body).forEach(key => {
      data[key] = req.body[key];
    });
    await data.save();
    res.json({ message: "Academics updated successfully!", data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;

// // routes/extracurricular.js
// import express from "express";
// import ExtraCurricular from "../models/ExtraCurricular.js";

// const router = express.Router();

// // GET visitor content
// router.get("/", async (req, res) => {
//   try {
//     const data = await ExtraCurricular.findOne();
//     res.json({ success: true, data });
//   } catch (err) {
//     res.status(500).json({ success: false, error: err.message });
//   }
// });

// // POST admin update content
// router.post("/", async (req, res) => {
//   try {
//     let ec = await ExtraCurricular.findOne();
//     if (!ec) ec = new ExtraCurricular();
//     Object.assign(ec, req.body);
//     await ec.save();
//     res.json({ success: true, data: ec });
//   } catch (err) {
//     res.status(500).json({ success: false, error: err.message });
//   }
// });

// export default router;









import express from "express";
import ExtraCurricular from "../models/ExtraCurricular.js";

const router = express.Router();

// GET all sections
router.get("/", async (req, res) => {
  try {
    const data = await ExtraCurricular.findOne();
    if (!data) {
      const defaultData = await ExtraCurricular.create({
        sections: {
          foreignLanguages: { title: "Foreign Languages", content: "Learn new languages." },
          ethics: { title: "Ethics & Personality Development", content: "Build personality and ethics." },
          sports: { title: "Sports", content: "Physical training and sports activities." },
          music: { title: "Music & Dance", content: "Music and dance classes." },
          artCraft: { title: "Art & Craft", content: "Painting, crafting activities." },
          tours: { title: "Tours & Trips", content: "Excursions and trips." },
        }
      });
      return res.json({ success: true, data: defaultData });
    }
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT update sections (admin)
router.put("/", async (req, res) => {
  try {
    let data = await ExtraCurricular.findOne();
    if (!data) data = new ExtraCurricular();
    data.sections = req.body.sections || data.sections;
    await data.save();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;

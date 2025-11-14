
// // backend/routes/admissionRoutes.js
// import express from "express";
// import multer from "multer";
// import path from "path";
// import { createAdmission, listAdmissions } from "../controllers/admissionController.js";

// const router = express.Router();

// // Configure multer storage for photo uploads
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/"); // Folder to save uploaded photos
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     const ext = path.extname(file.originalname);
//     cb(null, file.fieldname + "-" + uniqueSuffix + ext);
//   }
// });

// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 5 * 1024 * 1024 }, // Max 5MB
//   fileFilter: function (req, file, cb) {
//     const allowedTypes = /jpeg|jpg|png/;
//     const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
//     const mimetype = allowedTypes.test(file.mimetype);
//     if (extname && mimetype) {
//       cb(null, true);
//     } else {
//       cb(new Error("Only JPG, JPEG, PNG images are allowed"));
//     }
//   }
// });

// // POST route to create admission with photo upload
// router.post("/", upload.single("photo"), createAdmission);

// // GET route to list all admissions
// router.get("/", listAdmissions);

// export default router;

















import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { createAdmission, listAdmissions } from "../controllers/admissionController.js";

const router = express.Router();

const uploadDir = path.resolve("uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + unique + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

router.post("/", upload.single("photo"), createAdmission);
router.get("/", listAdmissions);

export default router;



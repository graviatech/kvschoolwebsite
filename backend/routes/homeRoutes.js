// backend/routes/homeRoutes.js
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import HomeContent from "../models/HomeContent.js";

const router = express.Router();

// ✅ Ensure upload directory exists
const uploadDir = path.resolve("uploads/home");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// ✅ Multer setup for videos/images
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname.replace(/\s+/g, "_");
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// 🟢 GET (for visitors)
router.get("/", async (req, res) => {
  try {
    const content = await HomeContent.findOne();
    res.json(
      content || {
        bannerVideos: [],
        welcomeText: "",
        activities: [],
        threeCol: [],
        testimonialVideos: [],
      }
    );
  } catch (err) {
    console.error("❌ Error fetching home content:", err);
    res.status(500).json({ error: "Failed to load home content" });
  }
});

// 🟢 POST (Admin — text + file upload combined)
router.post("/", upload.single("file"), async (req, res) => {
  try {
    const { section } = req.query; // e.g. section=bannerVideos
    const file = req.file;
    const bodyData = req.body;

    let content = await HomeContent.findOne();
    if (!content) content = new HomeContent();

    // ✅ If a file was uploaded, attach it to the proper array
    if (file && section) {
      const fileUrl = `/uploads/home/${file.filename}`;
      if (!content[section]) content[section] = [];
      content[section].push(fileUrl);
    }

    // ✅ If there’s text/JSON data, update those fields
    if (Object.keys(bodyData).length > 0 && !file) {
      Object.assign(content, bodyData);
    }

    await content.save();

    res.json({
      success: true,
      message: "Home content saved successfully ✅",
      content,
    });
  } catch (err) {
    console.error("❌ Upload/Save Error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to save home data",
      error: err.message,
    });
  }
});

export default router;

import express from "express";
import multer from "multer";
import path from "path";
import Gallery from "../models/Gallery.js";
import fs from "fs";
const router = express.Router();

// Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// ----------------- Admin Upload -----------------
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const url = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    const newImage = new Gallery({
      filename: req.file.filename,
      url
    });

    await newImage.save();
    res.json({ message: "Upload successful", image: newImage });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ----------------- Get All Images -----------------
router.get("/", async (req, res) => {
  try {
    const images = await Gallery.find().sort({ uploadedAt: -1 });
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//--------------------DELETE ROUTE--------------------------
// Delete image by ID
router.delete("/:id", async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);
    if (!image) return res.status(404).json({ message: "Image not found" });

    // Remove file from uploads folder
    // import fs from "fs";
    fs.unlinkSync(`uploads/${image.filename}`);

    await Gallery.findByIdAndDelete(req.params.id);
    res.json({ message: "Image deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;


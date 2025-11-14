import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();

// ✅ Ensure uploads folder exists
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log("✅ Created uploads folder:", uploadDir);
}

// ✅ Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// ✅ Upload route
router.post("/", upload.single("file"), (req, res) => {
  try {
    console.log("🟢 Upload route hit");
    console.log("File info:", req.file);

    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const fileUrl = `http://localhost:5000/uploads/${req.file.filename}`;
    console.log("✅ File uploaded successfully:", fileUrl);

    res.json({ success: true, url: fileUrl });
  } catch (err) {
    console.error("❌ Upload error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;


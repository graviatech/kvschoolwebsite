

// server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import path from "path";
import morgan from "morgan";

// MongoDB routes
import authRoutes from "./routes/authRoutes.js";
import admissionRoutes from "./routes/admissionRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import contactInfoRoutes from "./routes/contactInfoRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import academicsRoutes from "./routes/academicsRoutes.js";
import feesRouter from "./routes/fees.js";
import extracurricularRouter from "./routes/extracurricular.js";
import galleryRoutes from "./routes/galleryRoutes.js";
import homeRoutes from "./routes/homeRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

// SQLite route
// import sqliteApi from "./routes/sqliteApi.js";
import sqliteRoutes from "./routes/sqliteRoutes.js";
import sqlitePagesRoutes from "./routes/sqlitePagesRoutes.js";

// Models
import HomeContent from "./models/HomeContent.js";

dotenv.config();
const app = express();
const __dirname = path.resolve();

// -------------------- MIDDLEWARE --------------------
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Content-Length", "X-Foo", "X-Bar"],
}));
app.use(morgan("dev"));

// Rate Limiter only in production
if (process.env.NODE_ENV === "production") {
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  });
  app.use(limiter);
}

// Serve uploads
app.use("/uploads", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Cross-Origin-Resource-Policy", "cross-origin");
  next();
});
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"), {
    setHeaders: (res, filePath) => {
      // Allow requests from your frontend
      res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
      res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");

      // Prevent caching issues in browser for media files
      res.setHeader("Cache-Control", "no-cache");
    },
  })
);


// -------------------- DATABASE CONNECTION --------------------
// MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("Mongo Error:", err.message));

// -------------------- MONGO ROUTES --------------------
app.use("/api/auth", authRoutes);
app.use("/api/admissions", admissionRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/contact-info", contactInfoRoutes);
app.use("/api/academics", academicsRoutes);
app.use("/api/fees", feesRouter);
app.use("/api/extracurricular", extracurricularRouter);
app.use("/api/gallery", galleryRoutes);
app.use("/api/home", homeRoutes);
app.use("/api/admin/home", homeRoutes);
app.use("/api/upload", uploadRoutes);

// Example MongoDB API
app.get("/api/home", async (req, res) => {
  try {
    const content = await HomeContent.findOne();
    res.json(content || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------- SQLITE ROUTES --------------------
// app.use("/api/sqlite/user", sqliteApi);
app.use("/api/sqlite", sqliteRoutes);
app.use("/api/sqlite", sqlitePagesRoutes);

// -------------------- ERROR HANDLER --------------------
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message });
});

// -------------------- START SERVER --------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});




// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import helmet from "helmet";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import rateLimit from "express-rate-limit";
// import path from "path";
// import morgan from "morgan";
// import sqliteApi from "./routes/sqliteApi.js";


// import authRoutes from "./routes/authRoutes.js";
// import admissionRoutes from "./routes/admissionRoutes.js";
// import adminRoutes from "./routes/adminRoutes.js";
// import contactInfoRoutes from "./routes/contactInfoRoutes.js";
// import contactRoutes from "./routes/contactRoutes.js";
// import academicsRoutes from "./routes/academicsRoutes.js";
// import feesRouter from "./routes/fees.js";
// import extracurricularRouter from "./routes/extracurricular.js";
// import galleryRoutes from "./routes/galleryRoutes.js";
// import homeRoutes from "./routes/homeRoutes.js";
// import uploadRoutes from "./routes/uploadRoutes.js";

// dotenv.config();
// const app = express();
// const __dirname = path.resolve();

// // DB connect
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB Connected"))
//   .catch(err => console.error("Mongo Error:", err.message));

// app.use(helmet());
// app.use(express.json());
// app.use(cookieParser());
// app.use(express.urlencoded({ extended: true }));


// // app.use(cors({
// //   // origin: process.env.FRONTEND_ORIGIN,
// //   // credentials: true
// //   origin: "http://localhost:3000",
// //   credentials: true,
// //   exposedHeaders: ["Content-Disposition"]
// // }));
// app.use(cors({
//   origin: "http://localhost:3000",
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   allowedHeaders: ["Content-Type", "Authorization"],
//   exposedHeaders: ["Content-Length", "X-Foo", "X-Bar"],
// }));

// app.use(morgan("dev"));

// // const limiter = rateLimit({ windowMs: 15*60*1000, max: 100 });
// // app.use(limiter);
// // Apply rate limiting only in production
// if (process.env.NODE_ENV === "production") {
//   const limiter = rateLimit({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 100,
//   });
//   app.use(limiter);
// }


// // // ✅ Allow frontend to access uploaded images
// // app.use("/uploads", (req, res, next) => {
// //   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
// //   res.header("Access-Control-Allow-Methods", "GET");
// //   next();
// // });
// app.use("/uploads", (req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header("Cross-Origin-Resource-Policy", "cross-origin"); // ✅ important for Chrome blocking
//   next();
// });

// // serve uploaded files
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// app.use("/uploads", express.static("uploads"));


// app.use("/api/auth", authRoutes);
// app.use("/api/admissions", admissionRoutes);
// app.use("/api/admin", adminRoutes);
// app.use("/api/contact", contactRoutes);
// app.use("/api/contact-info", contactInfoRoutes);
// app.use("/api/academics", academicsRoutes);
// app.use("/api/fees", feesRouter)
// app.use("/api/extracurricular", extracurricularRouter);
// app.use("/api/gallery", galleryRoutes);
// app.use("/api/home", homeRoutes);
// app.use("/api/admin/home", homeRoutes);
// app.use("/api/upload", uploadRoutes);
// // SQLite API routes
// app.use("/api/sqlite", sqliteApi);




// import HomeContent from "./models/HomeContent.js";
// app.get("/api/home", async (req, res) => {
//   const content = await HomeContent.findOne();
//   res.json(content || {});
// });




// app.use((err, req, res, next) => {
//   console.error(err);
//   res.status(500).json({ error: err.message });
// });

// app.listen(process.env.PORT, () =>
//   console.log(`Server running on port ${process.env.PORT}`)
// );



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
  origin: "http://localhost:3000",
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
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

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


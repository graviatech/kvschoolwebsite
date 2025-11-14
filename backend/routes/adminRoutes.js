// import express from "express";
// import { getAllAdmissions, viewAdmission } from "../controllers/adminController.js";
// import { authenticate } from "../middleware/auth.js";

// const router = express.Router();

// router.get("/admissions", authenticate, getAllAdmissions);
// router.get("/admissions/:id", authenticate, viewAdmission);

// export default router;










// import express from "express";
// import { authenticate } from "../middleware/auth.js";
// import {
//   getTeachers, addTeacher, updateTeacher, deleteTeacher,
//   getNotices, addNotice, updateNotice, deleteNotice,
//   getProfile, updateProfile
// } from "../controllers/adminController.js";

// const router = express.Router();

// router.use(authenticate);

// // Teachers
// router.get("/teachers", getTeachers);
// router.post("/teachers", addTeacher);
// router.put("/teachers/:id", updateTeacher);
// router.delete("/teachers/:id", deleteTeacher);

// // Notices
// router.get("/notices", getNotices);
// router.post("/notices", addNotice);
// router.put("/notices/:id", updateNotice);
// router.delete("/notices/:id", deleteNotice);

// // Admin Profile
// router.get("/profile", getProfile);
// router.put("/profile", updateProfile);

// export default router;











// import express from "express";
// import { authenticate } from "../middleware/auth.js";
// import {
//   getTeachers, addTeacher, updateTeacher, deleteTeacher,
//   getNotices, addNotice, updateNotice, deleteNotice,
//   getProfile, updateProfile,
//   getAllAdmissions, viewAdmission
// } from "../controllers/adminController.js";

// const router = express.Router();
// router.use(authenticate);

// // Admissions
// router.get("/admissions", getAllAdmissions);
// router.get("/admissions/:id", viewAdmission);

// // Teachers
// router.get("/teachers", getTeachers);
// router.post("/teachers", addTeacher);
// router.put("/teachers/:id", updateTeacher);
// router.delete("/teachers/:id", deleteTeacher);

// // Notices
// router.get("/notices", getNotices);
// router.post("/notices", addNotice);
// router.put("/notices/:id", updateNotice);
// router.delete("/notices/:id", deleteNotice);

// // Admin Profile
// router.get("/profile", getProfile);
// router.put("/profile", updateProfile);

// export default router;







// adminRoutes.js
import express from "express";
import { authenticate } from "../middleware/auth.js";
import {
  listAdmissions, getAdmissionById,
  getTeachers, addTeacher, updateTeacher, deleteTeacher,
  getNotices, addNotice, updateNotice, deleteNotice,
  getProfile, updateProfile
} from "../controllers/adminController.js";

const router = express.Router();

// =======================
// Apply authentication to all admin routes
// =======================
router.use(authenticate);

// =======================
// Admissions
// =======================
router.get("/admissions", listAdmissions);
router.get("/admissions/:id", getAdmissionById);

// =======================
// Teachers
// =======================
router.get("/teachers", getTeachers);
router.post("/teachers", addTeacher);
router.put("/teachers/:id", updateTeacher);
router.delete("/teachers/:id", deleteTeacher);

// =======================
// Notices
// =======================
router.get("/notices", getNotices);
router.post("/notices", addNotice);
router.put("/notices/:id", updateNotice);
router.delete("/notices/:id", deleteNotice);

// =======================
// Admin Profile
// =======================
router.get("/profile", getProfile);
router.put("/profile", updateProfile);

export default router;




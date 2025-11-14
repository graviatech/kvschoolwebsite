


// adminController.js
import Teacher from "../models/Teacher.js";
import Notice from "../models/Notice.js";
import User from "../models/User.js"; // admin user model
import Admission from "../models/Admission.js";

// =======================
// Admissions (Admin view)
// =======================
export const listAdmissions = async (req, res) => {
  try {
    const admissions = await Admission.find().sort({ createdAt: -1 });
    res.json(admissions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAdmissionById = async (req, res) => {
  try {
    const admission = await Admission.findById(req.params.id);
    if (!admission) return res.status(404).json({ error: "Not found" });
    res.json(admission);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// =======================
// Teachers
// =======================
export const getTeachers = async (req, res) => {
  const teachers = await Teacher.find().sort({ createdAt: -1 });
  res.json(teachers);
};

export const addTeacher = async (req, res) => {
  const teacher = await Teacher.create(req.body);
  res.json(teacher);
};

export const updateTeacher = async (req, res) => {
  const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(teacher);
};

export const deleteTeacher = async (req, res) => {
  await Teacher.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};

// =======================
// Notices
// =======================
export const getNotices = async (req, res) => {
  const notices = await Notice.find().sort({ createdAt: -1 });
  res.json(notices);
};

export const addNotice = async (req, res) => {
  const notice = await Notice.create(req.body);
  res.json(notice);
};

export const updateNotice = async (req, res) => {
  const notice = await Notice.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(notice);
};

export const deleteNotice = async (req, res) => {
  await Notice.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};

// =======================
// Admin Profile
// =======================
export const getProfile = async (req, res) => {
  const user = await User.findById(req.adminId); // authenticate middleware must set req.adminId
  res.json(user);
};

export const updateProfile = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.adminId, req.body, { new: true });
  res.json(user);
};


// backend/controllers/admissionController.js

import Admission from "../models/Admission.js";
import fs from "fs";
import path from "path";

export const createAdmission = async (req, res) => {
  try {
    const admissionNo = "KV-" + Date.now().toString().slice(-6);
    const photoPath = req.file ? `/uploads/${req.file.filename}` : null;

    const admission = await Admission.create({
      ...req.body,
      admissionNo,
      photo: photoPath
    });

    res.status(201).json({ success: true, admission });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const listAdmissions = async (req, res) => {
  try {
    const list = await Admission.find().sort({ createdAt: -1 });
    res.json(list);
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










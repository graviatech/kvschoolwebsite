

import React, { useState } from "react";
// import axios from "axios";
import api from "../api";  // relative path to api.js

import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom"; // ✅ import for redirect
import "../styles/main.css";

export default function AdmissionForm() {
  const [form, setForm] = useState({});
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const navigate = useNavigate(); // ✅ initialize

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPhoto(file);

    // ✅ Preview
    const reader = new FileReader();
    reader.onloadend = () => setPhotoPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(form).forEach(([key, val]) => data.append(key, val));
    if (photo) data.append("photo", photo);

    try {
      const res = await api.post("/api/admissions", data);

      // ✅ Show toast with admission number
      toast.success(
        `Admission submitted! Your Admission No: ${res.data.admission.admissionNo}`,
        { duration: 2000 } // show toast for 2 seconds
      );

      // ✅ After 2 seconds, navigate to /admissions page
      setTimeout(() => {
        navigate("/admissions");
      }, 2000);

      // Reset form data
      setForm({});
      setPhoto(null);
      setPhotoPreview(null);
    } catch (err) {
      toast.error(
        "Error submitting form: " + (err.response?.data?.error || "Unknown error")
      );
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <Toaster />
      <h2>Student Admission Form</h2>

      <input
        name="studentName"
        placeholder="Student Name *"
        onChange={handleChange}
        required
      />
      <input name="parentName" placeholder="Parent Name" onChange={handleChange} />
      <input
        name="classApplied"
        placeholder="Class Applied For"
        onChange={handleChange}
      />
      <input name="age" placeholder="Age" onChange={handleChange} />
      <input
        name="phone"
        placeholder="Phone *"
        onChange={handleChange}
        required
      />
      <input
        name="email"
        placeholder="Email *"
        onChange={handleChange}
        required
      />
      <textarea
        name="address"
        placeholder="Address *"
        onChange={handleChange}
        required
      />

      <label>Upload Photo</label>
      <input type="file" accept="image/*" onChange={handlePhotoChange} required />
      {photoPreview && (
        <img
          src={photoPreview}
          alt="Preview"
          width={150}
          style={{ display: "block", marginTop: "10px" }}
        />
      )}

      <button type="submit">Submit</button>
    </form>
  );
}

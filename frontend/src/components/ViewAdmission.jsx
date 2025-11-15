


import React, { useEffect, useState } from "react";
// import axios from "axios";
import api from "../api";  // relative path to api.js

import { useParams, Link } from "react-router-dom"; 
import toast, { Toaster } from "react-hot-toast";
import "../styles/main.css";

export default function ViewAdmission() {
  const { id } = useParams(); 
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get(`/api/admin/admissions/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Photo path:", res.data.photo);
        setData(res.data);
        toast.success("Admission details loaded successfully!");
      } catch (err) {
        console.error("Error fetching admission:", err);
        toast.error("Failed to fetch admission details!");
      }
    };
    if (id) fetchDetails();
  }, [id]);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="view-admission">
      <Toaster /> {/* 🔹 Toast container */}
      <h2>Admission Details</h2>
      {data.photo && (
        <img
          src={data.photo?.startsWith("http") ? data.photo : `http://localhost:5000${data.photo}`}
          alt="Student"
          width="150"
        />
      )}
      <div className="info">
        <p><strong>Admission No:</strong> {data.admissionNo}</p>
        <p><strong>Name:</strong> {data.studentName}</p>
        <p><strong>Parent Name:</strong> {data.parentName}</p>
        <p><strong>Class:</strong> {data.classApplied}</p>
        <p><strong>Age:</strong> {data.age}</p>
        <p><strong>Phone:</strong> {data.phone}</p>
        <p><strong>Email:</strong> {data.email}</p>
        <p><strong>Address:</strong> {data.address}</p>
      </div>
      <Link to="/admin/dashboard" className="back-btn">Back to List</Link>
    </div>
  );
}

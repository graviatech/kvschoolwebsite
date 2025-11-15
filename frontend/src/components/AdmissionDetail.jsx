


import React, { useEffect, useState } from "react"; 
import { useParams } from "react-router-dom";
// import axios from "axios";
import api from "../api";  // relative path to api.js

import toast, { Toaster } from "react-hot-toast";

export default function AdmissionDetail() {
  const { id } = useParams();
  const [admission, setAdmission] = useState(null);

  useEffect(() => {
    const fetchAdmission = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get(
          `/api/admin/admissions/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setAdmission(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch admission details!");
      }
    };
    fetchAdmission();
  }, [id]);

  if (!admission) return <p>Loading...</p>;

  return (
    <div>
      <Toaster /> {/* 🔹 Toast container */}
      <h2>Admission Detail</h2>
      <p><strong>Admission No:</strong> {admission.admissionNo}</p>
      <p><strong>Student Name:</strong> {admission.studentName}</p>
      <p><strong>Parent Name:</strong> {admission.parentName}</p>
      <p><strong>Class:</strong> {admission.classApplied}</p>
      <p><strong>Age:</strong> {admission.age}</p>
      <p><strong>Phone:</strong> {admission.phone}</p>
      <p><strong>Email:</strong> {admission.email}</p>
      <p><strong>Address:</strong> {admission.address}</p>
      {admission.photo && (
        <img src={`http://localhost:5000${admission.photo}`} alt="Student" width={200} />
      )}
    </div>
  );
}

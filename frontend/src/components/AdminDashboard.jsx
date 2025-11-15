


import React, { useEffect, useState } from "react";
// import axios from "axios";
import api from "../api";  // relative path to api.js


export default function AdminDashboard() {
  const [admissions, setAdmissions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const res = await api.get("/api/admin/admissions", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAdmissions(res.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2 style={{color: "#003366", fontSize: "28px", marginBottom: "10px"}}>View Admissions</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Admission No.</th>
            <th>Student Name</th>
            <th>Class</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {admissions.map((a) => (
            <tr key={a._id}>
              <td>{a.admissionNo}</td>
              <td>{a.studentName}</td>
              <td>{a.classApplied}</td>
              <td>
                <button className="ad-dash-view-btn" onClick={() => window.open(`/admin/admission/${a._id}`, "_blank")}>
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

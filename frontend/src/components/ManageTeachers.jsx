

import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function ManageTeachers() {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/admin/teachers", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTeachers(res.data || []);
        toast.success("Teachers loaded successfully!");
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch teachers");
      }
    };

    fetchTeachers();
  }, []);

  return (
    <div className="admin-page">
      <Toaster /> {/* 🔹 Toast container */}
      <h2>Manage Teachers</h2>
      {teachers.length === 0 ? (
        <p>No teachers found.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Subject</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((t) => (
              <tr key={t._id}>
                <td>{t.name}</td>
                <td>{t.email}</td>
                <td>{t.subject}</td>
                <td>
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}






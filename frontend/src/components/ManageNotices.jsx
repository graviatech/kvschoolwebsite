
import React, { useEffect, useState } from "react";
// import axios from "axios";
import api from "../api";  // relative path to api.js

import toast, { Toaster } from "react-hot-toast";

export default function ManageNotices() {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/api/admin/notices", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotices(res.data || []);
        toast.success("Notices loaded successfully!");
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch notices");
      }
    };

    fetchNotices();
  }, []);

  return (
    <div className="admin-page">
      <Toaster /> {/* 🔹 Toast container */}
      <h2>Manage Notices</h2>
      {notices.length === 0 ? (
        <p>No notices found.</p>
      ) : (
        <ul>
          {notices.map((n) => (
            <li key={n._id}>
              <strong>{n.title}</strong> - {n.date}
              <button>Edit</button>
              <button>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}



import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";


export default function AdminProfile() {
  const [profile, setProfile] = useState({ username: "", email: "" });
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/admin/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data);
        setForm({ ...form, username: res.data.username, email: res.data.email });
        toast.success("Profile loaded successfully!");
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch profile");
      }
    };
    fetchProfile();
    // eslint-disable-next-line
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put("http://localhost:5000/api/admin/profile", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="admin-page">
      <Toaster /> {/* 🔹 Toast container */}
      <h2>Admin Profile</h2>
      <form onSubmit={handleSubmit} className="admin-profile-form">
        <div>
          <label>Username:</label>
          <input name="username" value={form.username} onChange={handleChange} />
        </div>
        <div>
          <label>Email:</label>
          <input name="email" value={form.email} onChange={handleChange} />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Leave blank to keep current password"
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}

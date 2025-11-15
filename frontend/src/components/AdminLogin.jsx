

import React, { useState } from "react";
// import axios from "axios";
import api from "../api";  // relative path to api.js

import toast, { Toaster } from "react-hot-toast";
import '../styles/main.css';

export default function AdminLogin() {
  const [form, setForm] = useState({});

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/auth/login", form);
      localStorage.setItem("token", res.data.token);
      toast.success("Login successful!");
      setTimeout(() => {
        window.location.href = "/admin/dashboard";
      }, 1000);
    } catch (err) {
      toast.error("Login failed!");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Toaster /> {/* 🔹 Toast container */}
      <h2>Admin Login</h2>
      <input name="username" placeholder="Username" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
      <button type="submit">Login</button>
    </form>
  );
}

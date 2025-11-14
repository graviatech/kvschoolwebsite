

// src/components/AdminHeader.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../styles/main.css";

export default function AdminHeader() {
  return (
    <header className="site-header">
      <div className="topbar">
        <div className="top-left">
          <img src="/assets/logo.png" alt="logo" className="logo" />
          <div className="school-meta">
            <div className="school-name">Kendriya Vidyalaya Sector-24 Noida</div>
            <div className="school-sub">CBSE Board Affiliated Co-Ed English Medium Senior Secondary School</div>
          </div>
        </div>
        <div className="top-right">
          <Link to="/" className="login-btn">
            Go to Website
          </Link>
        </div>
      </div>
    </header>
  );
}









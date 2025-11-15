

// src/components/AdminLayout.jsx
import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import Footer from "./Footer";
import "../styles/main.css";

export default function AdminLayout() {
  return (
    <>
      <AdminHeader />

      <div className="admin-layout">
        <aside className="admin-sidebar">
          <h2 style={{color: "white"}}>Admin Panel</h2>
          <nav>
            <NavLink to="/admin/dashboard">Dashboard</NavLink>
            <NavLink to="/admin/manage-home">Manage Home Page</NavLink>
            <NavLink to="/admin/manage-academics">Manage Academics</NavLink>
            <NavLink to="/admin/manage-extracurricular">Manage Extra Curricular</NavLink>
            <NavLink to="/admin/manage-gallery">Manage Gallery</NavLink>
            <NavLink to="/admin/profile">Profile</NavLink>
            <NavLink to="/admin/teachers">Manage Teachers</NavLink>
            <NavLink to="/admin/notices">Notices</NavLink>
            <NavLink to="/admin/contact">Manage Contact</NavLink>
            <NavLink to="/admin/manage-fees">Manage Fee Structure</NavLink>
            <NavLink to="/admin/students-fees">Students Fee Records</NavLink>
            <NavLink to="/admin/fee-history">Fee Payment History</NavLink>
            <NavLink to="/">Go to Website</NavLink>
            


          </nav>
        </aside>

        <main className="admin-content">
          <Outlet />
        </main>
      </div>

      <Footer />
    </>
  );
}

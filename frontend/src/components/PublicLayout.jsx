// src/components/PublicLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";


export default function PublicLayout() {
  return (
    <>
      {/* Common Header for all parent pages */}
      <Header />

      {/* Page Content */}
      <main
        style={{
          minHeight: "80vh",
          padding: "1rem",
          display: "flex",
          justifyContent: "center", // centers horizontally
          alignItems: "flex-start", // optional: top alignment vertically
          flexDirection: "column",   // stack children vertically
        }}
      >
        <Outlet />
      </main> 


      {/* Common Footer */}
      <Footer />
    </>
  );
}


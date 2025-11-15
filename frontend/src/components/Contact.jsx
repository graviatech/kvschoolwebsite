

import React, { useEffect, useState } from "react";
// import axios from "axios";
import api from "../api";  // relative path to api.js

import toast, { Toaster } from "react-hot-toast";
import Banner from "./Banner";
import "../styles/main.css";

export default function Contact() {
  const [content, setContent] = useState("");

  useEffect(() => {
    api.get("/api/contact-info")
      .then(res => setContent(res.data?.content || ""))
      .catch(err => {
        console.error(err);
        toast.error("Failed to load contact information!");
      });
  }, []);

  const decodeHTML = (str) => {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = str;
    return textarea.value;
  };

  return (
    <>
      <Toaster /> {/* 🔹 Toast container */}
      <Banner /> {/* ✅ added */}
      <main className="main-container">
        <div className="two-column">
          <div className="left-column">
            <h2>Contact Us</h2>
          </div>
          <div className="right-column" dangerouslySetInnerHTML={{ __html: decodeHTML(content) }}>
            {/* 
            <p>Address: A-7, Sector-24, Noida, Uttar Pradesh - 201301</p>
            <p>Landmarks: Opposite Sector 24 Police Station, near NTPC Noida, and near ESIC Hospital </p>
            <p>Email: kvnoida03@gmail.com</p>
            <p>Facebook: <a href="https://www.facebook.com/p/PM-SHRI-Kendriya-Vidyalaya-Sector-24-Noida-61565191564147/" target="_blank" rel="noreferrer">www.facebook.com/kv.in</a></p>
            <p>Twitter: <a href="https://x.com/KvNoida/status/1869210561445265497" target="_blank" rel="noreferrer">www.twitter.com/kv.in</a></p>
            <p>Call/Whatsapp: (0120) 4327434, (0120) 4327435</p> */}
          </div>
        </div>
      </main>
    </>
  );
}





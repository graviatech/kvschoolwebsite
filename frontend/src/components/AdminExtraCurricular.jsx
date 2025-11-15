

import React, { useEffect, useState } from "react";
// import axios from "axios";
import api from "../api";  // relative path to api.js

import toast, { Toaster } from "react-hot-toast";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

export default function AdminExtraCurricular() {
  const [sections, setSections] = useState({}); // ✅ safe initialization
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const res = await api.get("/api/extracurricular");
        setSections(res.data.data?.sections || {});
      } catch {
        toast.error("Failed to fetch content");
      } finally {
        setLoading(false);
      }
    };
    fetchSections();
  }, []);

  const handleChange = (key, value) => {
    setSections(prev => ({
      ...prev,
      [key]: { ...prev[key], content: value }
    }));
  };

  const saveChanges = async () => {
    try {
      await api.put("/api/extracurricular", { sections });
      toast.success("Sections updated successfully!");
    } catch {
      toast.error("Failed to save changes");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="admin-extra-page">
      <Toaster />
      <h2 style={{ color: "#003366", marginBottom: "20px" }}>Admin: Edit Extra Curricular Sections</h2>
      {Object.keys(sections).map((key) => (
        <div key={key} style={{ marginBottom: "20px" }}>
          <h3 style={{ color: "#003366", marginBottom: "10px" }}>{sections[key].title}</h3>
          <ReactQuill
            theme="snow"
            value={sections[key].content}
            onChange={(val) => handleChange(key, val)}
          />
        </div>
      ))}
      <button className="extra-curr-save--btn" onClick={saveChanges} style={{ marginTop: "20px", padding: "10px 20px" }}>
        Save Changes
      </button>
    </div>
  );
}



import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ReactQuill from "react-quill";
import toast, { Toaster } from "react-hot-toast";
import "react-quill/dist/quill.snow.css";
import "../styles/AdminAcademics.css";

export default function AdminEditSection() {
  const { sectionKey } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5000/api/academics")
      .then(res => {
        if (res.data && res.data[sectionKey]) setContent(res.data[sectionKey]);
        setLoading(false);
        toast.success("Section loaded successfully!");
      })
      .catch(err => {
        toast.error("Failed to load section.");
        console.error(err);
        setLoading(false);
      });
  }, [sectionKey]);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "http://localhost:5000/api/academics",
        { [sectionKey]: content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Section updated successfully!");
      navigate("/admin/manage-academics");
    } catch (err) {
      toast.error("Error updating section.");
      console.error(err);
    }
  };

  if (loading) return <p>Loading...</p>;

  const sectionLabel = sectionKey.charAt(0).toUpperCase() + sectionKey.slice(1);

  return (
    <div className="admin-academics-container">
      <Toaster /> {/* 🔹 Hot Toast container */}
      <h2>Edit {sectionLabel} Section</h2>
      <ReactQuill
        theme="snow"
        value={content}
        onChange={setContent}
        className="editor-box"
      />
      <div className="editor-buttons">
        <button onClick={handleSave} className="save-btn">Save Changes</button>
        <button onClick={() => navigate("/admin/manage-academics")} className="cancel-btn">
          Cancel
        </button>
      </div>
    </div>
  );
}






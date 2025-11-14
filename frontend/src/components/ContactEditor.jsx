

import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function ContactEditor() {
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/api/contact-info")
      .then(res => setContent(res.data?.content || ""))
      .catch(err => {
        console.error(err);
        toast.error("Failed to load contact info!");
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await axios.put("http://localhost:5000/api/contact-info", { content });
      toast.success("✅ Contact info updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update contact info!");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-editor">
      <Toaster /> {/* 🔹 Toast container */}
      <h2 style={{color: "#003366"}}>Edit Contact Info</h2>
      <ReactQuill value={content} onChange={setContent} theme="snow" />
      <button className="contact-editor-save-btn" onClick={handleSave} disabled={saving}>
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}


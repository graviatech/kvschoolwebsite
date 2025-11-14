
import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import toast, { Toaster } from "react-hot-toast";
import "react-quill/dist/quill.snow.css";
import "../styles/AdminAcademics.css";

export default function AdminManageAcademics() {
  const [formData, setFormData] = useState({
    pedagogy: "",
    annualCalendar: "",
    result: "",
    curriculum: "",
    subjects: "",
    faculty: "",
    examination: "",
    examinationResult: "",
  });

  const sections = [
    { label: "Pedagogy", key: "pedagogy" },
    { label: "Annual Calendar", key: "annualCalendar" },
    { label: "Result", key: "result" },
    { label: "Curriculum", key: "curriculum" },
    { label: "Subjects", key: "subjects" },
    { label: "Faculty", key: "faculty" },
    { label: "Examination", key: "examination" },
    { label: "Examination Result", key: "examinationResult" },
  ];

  useEffect(() => {
    axios.get("http://localhost:5000/api/academics")
      .then(res => {
        if (res.data) setFormData(res.data);
        toast.success("Academics data loaded!");
      })
      .catch(err => {
        toast.error("Failed to load academics data.");
        console.error(err);
      });
  }, []);

  const handleChange = (key, value) => setFormData(prev => ({ ...prev, [key]: value }));

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "http://localhost:5000/api/academics",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Academics content updated successfully!");
    } catch (err) {
      toast.error("Error updating academics.");
      console.error(err);
    }
  };

  return (
    <div className="admin-academics-container">
      <Toaster />
      <h2>Manage Academics</h2>
      {sections.map(section => (
        <div key={section.key} className="editor-section">
          <h3>{section.label}</h3>
          <ReactQuill
            theme="snow"
            value={formData[section.key]}
            onChange={(value) => handleChange(section.key, value)}
            className="editor-box"
          />
        </div>
      ))}
      <button onClick={handleSave} className="save-btn">Save Changes</button>
    </div>
  );
}

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// export default function AdminHomeManager() {
//   const [content, setContent] = useState({});
//   const [newFile, setNewFile] = useState(null);

//   useEffect(() => {
//     axios.get("http://localhost:5000/api/home").then(res => setContent(res.data || {}));
//   }, []);

//   const handleChange = (e) => {
//     setContent({ ...content, [e.target.name]: e.target.value });
//   };

//   const handleUpload = async () => {
//     if (!newFile) return alert("Select a file first!");
//     const formData = new FormData();
//     formData.append("file", newFile);
//     const res = await axios.post("http://localhost:5000/api/home/upload", formData);
//     alert("Uploaded: " + res.data.url);
//   };

//   const handleSave = async () => {
//     await axios.put("http://localhost:5000/api/home", content);
//     alert("Content updated successfully!");
//   };

//   return (
//     <div className="admin-home-manager">
//       <h2>Manage Home Page</h2>

//       <label>Welcome Text</label>
//       <textarea
//         name="welcomeText"
//         value={content.welcomeText || ""}
//         onChange={handleChange}
//         rows={4}
//       />

//       <div>
//         <h3>Upload Media</h3>
//         <input type="file" onChange={(e) => setNewFile(e.target.files[0])} />
//         <button onClick={handleUpload}>Upload</button>
//       </div>

//       <button onClick={handleSave}>💾 Save Changes</button>
//     </div>
//   );
// }












import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import "../styles/main.css";

export default function AdminManageHome() {
  const [data, setData] = useState({
    bannerVideos: [],
    welcomeText: "",
    activities: [],
    threeCol: [],
    testimonialVideos: [],
    threeColumnSection: {
      latestNewsHeading: "",
      latestNewsParagraph: "",
      activityCalendar: "",
      calendarButtonLink: "#",
      video: "",
    },
  });
  const [calendarFile, setCalendarFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch home content
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/home")
      .then((res) => {
        setData((prev) => ({
          ...prev,
          ...res.data,
          threeColumnSection: {
            latestNews: res.data.threeColumnSection?.latestNews || "",
            latestNewsParagraph:
              res.data.threeColumnSection?.latestNewsParagraph || "",
            activityCalendar: res.data.threeColumnSection?.activityCalendar || "",
            calendarButtonLink:
              res.data.threeColumnSection?.calendarButtonLink || "#",
            video: res.data.threeColumnSection?.video || "",
          },
        }));
      })
      .catch((err) => console.error("Error loading home data:", err));
  }, []);

  // File upload for banner, activities, testimonials
  const handleFileUpload = async (e, section) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/admin/home",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          params: { section },
        }
      );

      if (res.data?.content?.[section]) {
        setData((prev) => ({
          ...prev,
          [section]: res.data.content[section],
        }));
      }
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed. Check console for details.");
    }
  };

  // Delete media
  const handleDelete = (key, index) => {
    setData((prev) => ({
      ...prev,
      [key]: prev[key].filter((_, i) => i !== index),
    }));
  };

  // Save all home content
  const handleSave = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      // Save calendar file first if updated
      if (calendarFile) {
        const formData = new FormData();
        formData.append("file", calendarFile);
        const res = await axios.post("http://localhost:5000/api/upload", formData, {
        //   headers: { "Content-Type": "multipart/form-data" },
        });
        setData((prev) => ({
          ...prev,
          threeColumnSection: {
            ...prev.threeColumnSection,
            activityCalendar: res.data.url,
          },
        }));
      }

      await axios.post("http://localhost:5000/api/admin/home", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      alert("✅ Home Page content saved successfully!");
    } catch (err) {
      console.error("Save failed:", err);
      alert("❌ Save failed. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-manage-home">
      <h1>Manage Home Page</h1>

      {/* Banner Videos */}
      <section className="admin-section">
        <h2 style={{color: "#003366"}}>Banner Videos</h2>
        <input
          type="file"
          accept="video/*"
          onChange={(e) => handleFileUpload(e, "bannerVideos")}
        />
        <div className="video-preview-grid">
          {data.bannerVideos?.map((vid, i) => (
            <div key={i} className="media-card">
              <video src={`http://localhost:5000${vid}`} controls />
              <button onClick={() => handleDelete("bannerVideos", i)}>🗑</button>
            </div>
          ))}
        </div>
      </section>

      {/* Welcome Text */}
      <section className="admin-section">
        <h2 style={{color: "#003366"}}>Welcome Text</h2>
        <ReactQuill
          theme="snow"
          value={data.welcomeText}
          onChange={(val) => setData({ ...data, welcomeText: val })}
        />
      </section>

      {/* Activities */}
      <section className="admin-section">
        <h2 style={{color: "#003366"}}>Activity Images</h2>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => handleFileUpload(e, "activities")}
        />
        <div className="image-grid">
          {data.activities?.map((img, i) => (
            <div key={i} className="media-card">
              <img src={`http://localhost:5000${img}`} alt="activity" />
              <button onClick={() => handleDelete("activities", i)}>🗑</button>
            </div>
          ))}
        </div>
      </section>

      {/* 3-Column Section */}
      <section className="admin-section">
        <h2 style={{color: "#003366"}}>3-Column Section</h2>

        {/* Latest News */}
        <div className="three-col-item">
          <h3>Latest News</h3>
          <input
            type="text"
            placeholder="Heading"
            value={data.threeColumnSection?.latestNewsHeading || ""}
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                threeColumnSection: {
                  ...prev.threeColumnSection,
                  latestNewsHeading: e.target.value,
                },
              }))
            }
          />
          <textarea
            placeholder="Paragraph"
            value={data.threeColumnSection?.latestNewsParagraph || ""}
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                threeColumnSection: {
                  ...prev.threeColumnSection,
                  latestNewsParagraph: e.target.value,
                },
              }))
            }
          />
        </div>

        {/* Calendar */}
        <div className="three-col-item">
          <h3>Activity Calendar</h3>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCalendarFile(e.target.files[0])}
          />
          {data.threeColumnSection?.activityCalendar && (
            <img
              src={data.threeColumnSection.activityCalendar}
              alt="Calendar Thumbnail"
              width={200}
            />
          )}
        </div>

        {/* Video */}
        <div className="three-col-item">
          <h3>Video (YouTube)</h3>
          <input
            type="text"
            placeholder="YouTube embed URL"
            value={data.threeColumnSection?.video || ""}
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                threeColumnSection: {
                  ...prev.threeColumnSection,
                  video: e.target.value,
                },
              }))
            }
          />
        </div>
      </section>

      {/* Testimonials */}
      <section className="admin-section">
        <h2 style={{color: "#003366"}}>Testimonial Videos</h2>
        <input
          type="file"
          accept="video/*"
          onChange={(e) => handleFileUpload(e, "testimonialVideos")}
        />
        <div className="video-preview-grid">
          {data.testimonialVideos?.map((vid, i) => (
            <div key={i} className="media-card">
              <video src={`http://localhost:5000${vid}`} controls />
              <button onClick={() => handleDelete("testimonialVideos", i)}>
                🗑
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Save Button */}
      <div className="save-wrapper">
        <button onClick={handleSave} disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}

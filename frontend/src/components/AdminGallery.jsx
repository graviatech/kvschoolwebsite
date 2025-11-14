

import React, { useState, useEffect } from "react";
import Banner from "./Banner";
import axios from "axios";
import "../styles/main.css";

export default function AdminGallery() {
  const [images, setImages] = useState([]);
  const [newFiles, setNewFiles] = useState([]);

  // Fetch gallery from backend
  useEffect(() => {
    axios.get("http://localhost:5000/api/gallery")
      .then(res => setImages(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files);

    for (let file of files) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const res = await axios.post("http://localhost:5000/api/gallery/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setImages(prev => [...prev, res.data.image]);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/gallery/${id}`);
      setImages(prev => prev.filter(img => img._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Banner />
      <div className="admin-gallery-page">
        <h2>Manage Gallery</h2>
        <div className="upload-section">
          <input type="file" multiple accept="image/*" onChange={handleUpload} />
        </div>

        {images.length === 0 ? (
          <p>No images in the gallery.</p>
        ) : (
          <div className="gallery-grid">
            {images.map((img, idx) => (
              <div className="gallery-card" key={idx}>
                <img src={img.url} alt={`Gallery ${idx + 1}`} />
                <button className="delete-btn" onClick={() => handleDelete(img._id)}>Delete</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}



































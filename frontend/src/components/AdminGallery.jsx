

// import React, { useState, useEffect } from "react";
// import Banner from "./Banner";
// // import axios from "axios";
// import api from "../api";  // relative path to api.js

// import "../styles/main.css";

// export default function AdminGallery() {
//   const [images, setImages] = useState([]);
//   const [newFiles, setNewFiles] = useState([]);

//   // Fetch gallery from backend
//   useEffect(() => {
//     api.get("/api/gallery")
//       .then(res => setImages(res.data))
//       .catch(err => console.error(err));
//   }, []);

//   const handleUpload = async (e) => {
//     const files = Array.from(e.target.files);

//     for (let file of files) {
//       const formData = new FormData();
//       formData.append("image", file);

//       try {
//         const res = await api.post("/api/gallery/upload", formData, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//         setImages(prev => [...prev, res.data.image]);
//       } catch (err) {
//         console.error(err);
//       }
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this image?")) return;

//     try {
//       await api.delete(`/api/gallery/${id}`);
//       setImages(prev => prev.filter(img => img._id !== id));
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <>
//       <Banner />
//       <div className="admin-gallery-page">
//         <h2>Manage Gallery</h2>
//         <div className="upload-section">
//           <input type="file" multiple accept="image/*" onChange={handleUpload} />
//         </div>

//         {images.length === 0 ? (
//           <p>No images in the gallery.</p>
//         ) : (
//           <div className="gallery-grid">
//             {images.map((img, idx) => (
//               <div className="gallery-card" key={idx}>
//                 <img src={img.url} alt={`Gallery ${idx + 1}`} />
//                 <button className="delete-btn" onClick={() => handleDelete(img._id)}>Delete</button>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </>
//   );
// }





import React, { useState, useEffect } from "react";
import Banner from "./Banner";
import api from "../api";  // relative path to api.js
import toast from "react-hot-toast";
import Swal from "sweetalert2";

import "../styles/main.css";

export default function AdminGallery() {
  const [images, setImages] = useState([]);

  // Fetch gallery from backend
  useEffect(() => {
    api
      .get("/api/gallery")
      .then((res) => setImages(res.data))
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load gallery");
      });
  }, []);

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    for (let file of files) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const res = await api.post("/api/gallery/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        setImages((prev) => [...prev, res.data.image]);
        toast.success("Image uploaded successfully");
      } catch (err) {
        console.error(err);
        toast.error("Upload failed");
      }
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "This image will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirmDelete.isConfirmed) return;

    try {
      await api.delete(`/api/gallery/${id}`);
      setImages((prev) => prev.filter((img) => img._id !== id));

      toast.success("Image deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete image");
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
                <button className="delete-btn" onClick={() => handleDelete(img._id)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}





























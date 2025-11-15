

// import React, { useEffect, useState } from "react";
// import Banner from "./Banner";
// // import axios from "axios";
// import api from "../api";  // relative path to api.js

// import "../styles/main.css";

// const Gallery = () => {
//   const [images, setImages] = useState([]);

//   // useEffect(() => {
//   //   axios.get("http://localhost:5000/api/gallery")
//   //     .then(res => setImages(res.data))
//   //     .catch(err => console.error(err));
//   // }, []);
//   useEffect(() => {
//     const fetchImages = () => {
//       api.get("/api/gallery")
//       .then(res => setImages(res.data))
//       .catch(err => console.error(err));
//     };

//     fetchImages(); // initial fetch

//     const interval = setInterval(fetchImages, 5000); // fetch every 5 seconds

//     return () => clearInterval(interval); // cleanup
//   }, []);


//   return (
//     <>
//       <Banner />
//       <div className="gallery-page" style={{ margin: "0 auto" }}>
//         <h2>Gallery</h2>
//         <div className="gallery-grid">
//           {images.map((img, idx) => (
//             <div className="gallery-card" key={idx}>
//               <img
//                 src={img.url}
//                 alt={`Gallery ${idx + 1}`}
//                 onError={(e) => (e.target.src = "/assets/placeholder.jpg")}
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Gallery;





import React, { useEffect, useState } from "react";
import Banner from "./Banner";
import api from "../api";  // relative path to api.js
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";

import "../styles/main.css";

const Gallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await api.get("/api/gallery");
        if (res.data.length === 0) {
          Swal.fire({
            icon: "info",
            title: "No Images",
            text: "Gallery is currently empty.",
          });
        }
        setImages(res.data);
        toast.success("Gallery updated!");
      } catch (err) {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load gallery images",
        });
      }
    };

    fetchImages(); // initial fetch
    const interval = setInterval(fetchImages, 5000); // fetch every 5 seconds

    return () => clearInterval(interval); // cleanup
  }, []);

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Banner />
      <div className="gallery-page" style={{ margin: "0 auto" }}>
        <h2>Gallery</h2>
        <div className="gallery-grid">
          {images.map((img, idx) => (
            <div className="gallery-card" key={idx}>
              <img
                src={img.url}
                alt={`Gallery ${idx + 1}`}
                onError={(e) => (e.target.src = "/assets/placeholder.jpg")}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Gallery;

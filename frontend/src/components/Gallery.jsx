

import React, { useEffect, useState } from "react";
import Banner from "./Banner";
import axios from "axios";
import "../styles/main.css";

const Gallery = () => {
  const [images, setImages] = useState([]);

  // useEffect(() => {
  //   axios.get("http://localhost:5000/api/gallery")
  //     .then(res => setImages(res.data))
  //     .catch(err => console.error(err));
  // }, []);
  useEffect(() => {
    const fetchImages = () => {
      axios.get("http://localhost:5000/api/gallery")
      .then(res => setImages(res.data))
      .catch(err => console.error(err));
    };

    fetchImages(); // initial fetch

    const interval = setInterval(fetchImages, 5000); // fetch every 5 seconds

    return () => clearInterval(interval); // cleanup
  }, []);


  return (
    <>
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

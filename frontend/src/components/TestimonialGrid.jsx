

import React, { useRef } from "react";
import "./TestimonialGrid.css";

export default function TestimonialGrid({ videos = [] }) {
  const refs = useRef([]);

  // pause all other videos when one plays
  function pauseAll(exceptIndex = -1) {
    refs.current.forEach((vid, i) => {
      if (vid && i !== exceptIndex) vid.pause();
    });
  }

  return (
    <section className="testimonial-section">
      <h3 className="testimonial-title">Testimonial Videos</h3>
      <div className="testimonial-grid">
        {videos.map((src, i) => (
          <div className="testimonial-card" key={i}>
            <video
              ref={(el) => (refs.current[i] = el)}
              src={src}
              className="testimonial-video"
              controls
              onPlay={() => pauseAll(i)}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

















// ActivityCarousel.jsx
import React, { useEffect, useState } from "react";

/*
Usage: <ActivityCarousel images={[ "/assets/activity1.jpg", ... ]} />
Auto-advances every 3.5s; has prev/next controls.
*/
export default function ActivityCarousel({ images = [], interval = 3500 }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % images.length), interval);
    return () => clearInterval(t);
  }, [images, interval]);

  if (!images || images.length === 0) {
    return <div>No activity images configured.</div>;
  }

  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length);
  const next = () => setIdx((i) => (i + 1) % images.length);

  return (
    <div className="activity-slider">
      <button className="act-arrow left" onClick={prev} aria-label="Prev activity">‹</button>
      <img src={images[idx]} alt={`activity-${idx}`} />
      <button className="act-arrow right" onClick={next} aria-label="Next activity">›</button>
    </div>
  );
}


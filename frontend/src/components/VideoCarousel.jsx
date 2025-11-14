
import React, { useRef, useState, useEffect } from "react";
import "./VideoCarousel.css";

export default function VideoCarousel({ videoList }) {
  const videos = videoList || [
    "/assets/banner1.mp4",
    "/assets/banner2.mp4",
    "/assets/banner3.mp4",
    "/assets/banner4.mp4",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showButton, setShowButton] = useState(false);
  const videoRef = useRef(null);
  const slideTimer = useRef(null);

  // 🕒 Auto slide only while playing
  useEffect(() => {
    if (isPlaying) {
      slideTimer.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % videos.length);
      }, 10000);
    } else {
      clearInterval(slideTimer.current);
    }
    return () => clearInterval(slideTimer.current);
  }, [isPlaying, videos.length]);

  // 🎬 Play/pause new video when slide changes
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    if (isPlaying) vid.play().catch(() => {});
    else vid.pause();
  }, [currentIndex, isPlaying]);

  // 🎮 Toggle play/pause by clicking anywhere on video
  const handleVideoClick = () => {
    const vid = videoRef.current;
    if (!vid) return;

    if (vid.paused) {
      vid.play().catch(() => {});
      setIsPlaying(true);
    } else {
      vid.pause();
      setIsPlaying(false);
    }

    // Show button briefly
    setShowButton(true);
    setTimeout(() => setShowButton(false), 1000);
  };

  // ⏮ Prev / ⏭ Next
  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };
  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  };

  return (
    <div className="carousel-container">
      <div
        className="carousel-track"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {videos.map((src, i) => (
          <video
            key={i}
            ref={i === currentIndex ? videoRef : null}
            src={src}
            muted
            loop
            playsInline
            className="carousel-video"
            onClick={handleVideoClick}
            autoPlay={i === currentIndex && isPlaying}
          />
        ))}
      </div>

      {/* Prev / Next */}
      <button className="vc-btn prev" onClick={handlePrev}>⟨</button>
      <button className="vc-btn next" onClick={handleNext}>⟩</button>

      {/* Play/Pause overlay (appears briefly) */}
      {showButton && (
        <button className="play-overlay" onClick={handleVideoClick}>
          {isPlaying ? "❚❚" : "►"}
        </button>
      )}

      <div className="video-index">{currentIndex + 1}/{videos.length}</div>
    </div>
  );
}




















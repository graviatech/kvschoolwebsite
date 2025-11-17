
// // Home.jsx
// import React from "react";
// import VideoCarousel from "./VideoCarousel";
// import ActivityCarousel from "./ActivityCarousel";
// import TestimonialGrid from "./TestimonialGrid";

// /*
// Update these asset paths or replace with remote URLs.
// Place files in public/assets as listed below.
// */
// const bannerVideos = [
//   "/assets/banner1.mp4",
//   "/assets/banner2.mp4",
//   "/assets/banner3.mp4",
//   "/assets/banner4.mp4"
// ];

// const activityImages = [
//   "/assets/activity1.jpg",
//   "/assets/activity2.jpg",
//   "/assets/activity3.jpg"
// ];

// const testimonialVideos = [
//   "/assets/test1.mp4",
//   "/assets/test2.mp4",
//   "/assets/test3.mp4",
//   "/assets/test4.mp4"
// ];

// export default function Home() {
//   return (
//     <main className="container home-page" style={{ margin: "0 auto" }}>
//       {/* Banner video carousel */}
//       <VideoCarousel videoList={bannerVideos} />

//       {/* Welcome / Activities */}
//       <section className="two-col card">
//         <div className="left-col">
//           <h2 style={{ color: "#0b3a73" }}>Welcome to Kendriya Vidyalaya Sector-24 Noida</h2>
//           <p>
//             Kendriya Vidyalaya Sector-24 Noida is dedicated to providing a high quality
//             education that nurtures academic excellence, moral values and global citizenship.
//           </p>
//           <p>
//             Our curriculum blends strong fundamentals, digital learning and extracurricular
//             activities to create confident, creative and compassionate learners.
//           </p>
//           <p>
//             Modern classrooms, experienced faculty and a caring environment make KV a place for
//             students to grow.
//           </p>
//           <p>
//             Admission open for session 2025-2026 — contact the school for details.
//           </p>
//         </div>

//         <div className="right-col activities">
//           <h3>Activities</h3>
//           <ActivityCarousel images={activityImages} />
//         </div>
//       </section>

//       {/* Three-column area */}
//       <section className="three-col">
//         <div className="col card">
//           <h3>Latest News</h3>
//           <div className="news-card">
//             <h4>Admissions Open 2025-2026</h4>
//             <p>
//               Admissions are open for session 2025-2026. Apply online or contact the school office.
//             </p>
//             <p><strong>Admission Helpline:</strong> 0120-2973473</p>
//           </div>
//         </div>

//         <div className="col card">
//           <h3>Activity Calendar</h3>
//           <div className="calendar-card">
//             <div className="cal-top">
//               <button title="Download" onClick={() => window.open("/assets/calendar.jpg", "_blank")}>⬇</button>
//               <button title="Print" onClick={() => window.print()}>🖨</button>
//               <button title="More">⋮</button>
//             </div>
//             <img src="/assets/calendar.jpg" alt="calendar" style={{ width: "100%", marginTop: 8 }} />
//             <div style={{ marginTop: 8 }}>
//               <a className="btn-small" href="/assets/calendar.jpg" target="_blank" rel="noreferrer">View</a>
//             </div>
//           </div>
//         </div>

//         <div className="col card">
//           <h3>GIPS Video</h3>
//           <div className="video-card">
//             <iframe
//               title="school-video"
//               width="100%"
//               height="200"
//               src="https://www.youtube.com/embed/dQw4w9WgXcQ"
//               frameBorder="0"
//               allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
//               allowFullScreen
//             />
//             <a className="btn-small" style={{ display: "inline-block", marginTop: 10 }} href="#">Five plants for good health</a>
//           </div>
//         </div>
//       </section>

//       {/* Testimonials */}
//       <TestimonialGrid
//         videos={[
//           "/assets/test1.mp4",
//           "/assets/test2.mp4",
//           "/assets/test3.mp4",
//           "/assets/test4.mp4",
//         ]}
//       />
//     </main>
//   );
// }










// import React, { useEffect, useState, useRef } from "react";
// // import axios from "axios";
// import api from "../api";  // relative path to api.js
// import { decryptData } from "../utils/encryption";
// import "../styles/main.css";

// const SERVER_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

// export default function Home() {
//   const [data, setData] = useState(null);
//   const [activityIndex, setActivityIndex] = useState(0);
//   const [bannerIndex, setBannerIndex] = useState(0);
//   const activityInterval = useRef(null);
//   const bannerInterval = useRef(null);

//   useEffect(() => {
//     api.get("/api/home")
//     .then(res => {
//       const f = res.data;

//       const decrypted = {
//         ...f,
//         welcomeText: f.welcomeText ? decryptData(f.welcomeText) : "",

//         threeColumnSection: {
//           ...f.threeColumnSection,

//           latestNewsHeading:
//             f.threeColumnSection?.latestNewsHeading
//               ? decryptData(f.threeColumnSection.latestNewsHeading)
//               : "",

//           latestNewsParagraph:
//             f.threeColumnSection?.latestNewsParagraph
//               ? decryptData(f.threeColumnSection.latestNewsParagraph)
//               : "",

//           video: f.threeColumnSection?.video || "",
//           activityCalendar: f.threeColumnSection?.activityCalendar || ""
//         }
//       };

//       setData(decrypted);
//     })
//     .catch(err => console.error("Home fetch error:", err));
//   }, []);


//   useEffect(() => {
//     if (data?.activities?.length > 1) {
//       activityInterval.current = setInterval(() => {
//         setActivityIndex((prev) =>
//           prev === data.activities.length - 1 ? 0 : prev + 1
//         );
//       }, 3000);
//     }
//     return () => clearInterval(activityInterval.current);
//   }, [data?.activities]);

//   useEffect(() => {
//     if (data?.bannerVideos?.length > 1) {
//       bannerInterval.current = setInterval(() => {
//         setBannerIndex((prev) =>
//           prev === data.bannerVideos.length - 1 ? 0 : prev + 1
//         );
//       }, 5000);
//     }
//     return () => clearInterval(bannerInterval.current);
//   }, [data?.bannerVideos]);

//   if (!data) return <p>Loading...</p>;

//   const togglePlayPause = (e) => {
//     const video = e.currentTarget;
//     if (video.paused) video.play();
//     else video.pause();
//   };

//   const getEmbedUrl = (url) => {
//     if (!url) return "";
//     if (url.includes("embed")) return url;
//     const match = url.match(/(?:v=|\.be\/)([a-zA-Z0-9_-]{11})/);
//     return match ? `https://www.youtube.com/embed/${match[1]}` : "";
//   };

//   return (
//     <main className="home-container" style={{ margin: "0 auto" }} >
//       {/* Banner Section */}
//       {data.bannerVideos?.length > 0 && (
//         <section className="banner-section">
//           <video
//             key={bannerIndex}
//             className="banner-video"
//             src={`${SERVER_URL}${data.bannerVideos[bannerIndex]}`}
//             autoPlay
//             muted
//             loop
//             onClick={togglePlayPause}
//           />
//         </section>
//       )}

//       {/* Welcome + Activities */}
//       <section className="welcome-activities-container">
//         <div
//           className="welcome-text"
//           dangerouslySetInnerHTML={{ __html: data.welcomeText }}
//         ></div>

//         <div className="activities-slider-wrapper">
//           <h3 style={{color: "#0078d4", fontSize:"30px"}}>School Activities</h3>
//           {data.activities.length > 0 && (
//             <div className="activities-slider-single">
//               <img
//                 key={activityIndex}
//                 src={`${SERVER_URL}${data.activities[activityIndex]}`}
//                 alt={`activity-${activityIndex}`}
//               />
//             </div>
//           )}
//         </div>
//       </section>

//       {/* 3-Column Section */}
//       {data.threeColumnSection && (
//         <section className="three-column-section">
//           <div className="column">
//             <h2>Latest News</h2>
//             <h3>{data.threeColumnSection?.latestNewsHeading || "Latest News"}</h3>
//             <p>
//               {data.threeColumnSection?.latestNewsParagraph ||
//               "News description goes here."}
//             </p>
//           </div>

//           <div className="column">
//             <h2>Activity Calendar</h2>
//             {data.threeColumnSection.activityCalendar && (
//               <>
//                 <img
//                   src={`${data.threeColumnSection.activityCalendar}`} alt="Calendar"
//                 />
//                 <button className="view-calender-btn"
//                   onClick={() =>
//                     window.open(
//                       `${data.threeColumnSection.activityCalendar}`,
//                       "_blank"
//                     )
//                   }
//                 >
//                   View Full Calendar
//                 </button>
//               </>
//             )}
//           </div>

//           <div className="column">
//             <h2>KV Videos</h2>
//             {data.threeColumnSection.video && (
//               <iframe
//                 width="100%"
//                 height="200"
//                 src={getEmbedUrl(data.threeColumnSection.video)}
//                 title="YouTube video"
//                 frameBorder="0"
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                 allowFullScreen
//               ></iframe>
//             )}
//           </div>
//         </section>
//       )}

//       {/* Testimonials */}
//       {data.testimonialVideos?.length > 0 && (
//         <section className="testimonials">
//           <h2 style={{color: "#0078d4", fontSize:"30px"}}>Student Testimonials</h2>
//           <div className="testimonial-grid">
//             {data.testimonialVideos.map((vid, i) => (
//               <video
//                 key={i}
//                 src={`${SERVER_URL}${vid}`}
//                 controls
//                 className="testimonial-video"
//               />
//             ))}
//           </div>
//         </section>
//       )}
//     </main>
//   );
// }






import React, { useEffect, useState, useRef } from "react";
import api from "../api";
import { decryptData } from "../utils/encryption";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";

import "../styles/Home.css";

const SERVER_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export default function Home() {
  const [data, setData] = useState(null);
  const [activityIndex, setActivityIndex] = useState(0);
  const [bannerIndex, setBannerIndex] = useState(0);
  const activityInterval = useRef(null);
  const bannerInterval = useRef(null);

  useEffect(() => {
    api.get("/api/home")
      .then(res => {
        const f = res.data;

        const decrypted = {
          ...f,
          welcomeText: f.welcomeText ? decryptData(f.welcomeText) : "",
          threeColumnSection: {
            ...f.threeColumnSection,
            latestNewsHeading: f.threeColumnSection?.latestNewsHeading
              ? decryptData(f.threeColumnSection.latestNewsHeading)
              : "",
            latestNewsParagraph: f.threeColumnSection?.latestNewsParagraph
              ? decryptData(f.threeColumnSection.latestNewsParagraph)
              : "",
            video: f.threeColumnSection?.video || "",
            activityCalendar: f.threeColumnSection?.activityCalendar || "",
          },
        };

        setData(decrypted);
        toast.success("Home data loaded successfully!");
      })
      .catch(err => {
        console.error("Home fetch error:", err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load home data.",
        });
      });
  }, []);

  useEffect(() => {
    if (data?.activities?.length > 1) {
      activityInterval.current = setInterval(() => {
        setActivityIndex((prev) =>
          prev === data.activities.length - 1 ? 0 : prev + 1
        );
      }, 3000);
    }
    return () => clearInterval(activityInterval.current);
  }, [data?.activities]);

  useEffect(() => {
    if (data?.bannerVideos?.length > 1) {
      bannerInterval.current = setInterval(() => {
        setBannerIndex((prev) =>
          prev === data.bannerVideos.length - 1 ? 0 : prev + 1
        );
      }, 5000);
    }
    return () => clearInterval(bannerInterval.current);
  }, [data?.bannerVideos]);

  if (!data) return <p>Loading...</p>;

  const togglePlayPause = (e) => {
    const video = e.currentTarget;
    if (video.paused) video.play();
    else video.pause();
  };

  const getEmbedUrl = (url) => {
    if (!url) return "";
    if (url.includes("embed")) return url;
    const match = url.match(/(?:v=|\.be\/)([a-zA-Z0-9_-]{11})/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : "";
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <main className="home-container" style={{ margin: "0 auto" }} >
        {/* Banner Section */}
        {data.bannerVideos?.length > 0 && (
          <section className="banner-section">
            <video
              key={bannerIndex}
              className="banner-video"
              src={`${SERVER_URL}${data.bannerVideos[bannerIndex]}`}
              autoPlay
              muted
              loop
              onClick={togglePlayPause}
            />
          </section>
        )}

        {/* Welcome + Activities */}
        <section>
          <div className="welcome-activities-container">

            {/* Welcome Text Card */}
            <div className="home-card">
              <div className="welcome-text-area">
                <div dangerouslySetInnerHTML={{ __html: data.welcomeText }} />
              </div>
            </div>

           {/* Activity Image Card */}
           <div className="home-card">
            <h3 className="activity-title">School Activities</h3>

            <div className="activity-image-box">
              <img
                src={`${SERVER_URL}${data.activities[activityIndex]}`}
                alt="activity"
              />
            </div>
          </div>

         </div>

        </section>

        {/* 3-Column Section */}
        {data.threeColumnSection && (
          <section className="three-column-section">
            <div className="column">
              <h2>Latest News</h2>
              <h3>{data.threeColumnSection?.latestNewsHeading || "Latest News"}</h3>
              <p>
                {data.threeColumnSection?.latestNewsParagraph ||
                "News description goes here."}
              </p>
            </div>

            <div className="column">
              <h2>Activity Calendar</h2>
              {data.threeColumnSection.activityCalendar && (
                <>
                  <img
                    src={`${data.threeColumnSection.activityCalendar}`} alt="Calendar"
                  />
                  <button className="view-calender-btn"
                    onClick={() =>
                      window.open(
                        `${data.threeColumnSection.activityCalendar}`,
                        "_blank"
                      )
                    }
                  >
                    View Full Calendar
                  </button>
                </>
              )}
            </div>

            <div className="column">
              <h2>KV Videos</h2>
              {data.threeColumnSection.video && (
                <iframe
                  width="100%"
                  height="200"
                  src={getEmbedUrl(data.threeColumnSection.video)}
                  title="YouTube video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
            </div>
          </section>
        )}

        {/* Testimonials */}
        {data.testimonialVideos?.length > 0 && (
          <section className="testimonials">
            <h2 style={{color: "#0078d4", fontSize:"30px"}}>Student Testimonials</h2>
            <div className="testimonial-grid">
              {data.testimonialVideos.map((vid, i) => (
                <video
                  key={i}
                  src={`${SERVER_URL}${vid}`}
                  controls
                  className="testimonial-video"
                />
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
}

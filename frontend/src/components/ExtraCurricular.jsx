
// import React, { useEffect, useState, useRef } from "react";
// // import axios from "axios";
// import api from "../api";  // relative path to api.js

// import Banner from "./Banner";

// export default function ExtraCurricular() {
//   const [sections, setSections] = useState({});
//   const sectionRefs = useRef({});

//   useEffect(() => {
//     const fetchSections = async () => {
//       try {
//         const res = await api.get("/api/extracurricular");
//         setSections(res.data.data?.sections || {});
//       } catch {
//         alert("Failed to fetch content");
//       }
//     };
//     fetchSections();
//   }, []);

//   const scrollToSection = (key) => {
//     sectionRefs.current[key]?.scrollIntoView({ behavior: "smooth" });
//   };

//   function decodeHTML(html) {
//     const txt = document.createElement("textarea");
//     txt.innerHTML = html;
//     return txt.value;
//   }

//   return (
//     <>
//       <Banner />
//       <div className="extra-page">
//         <div className="left-column">
//           <h2>Extra Curricular</h2>
//           <div className="info-box">
//             {Object.keys(sections).map(key => (
//               <p key={key} onClick={() => scrollToSection(key)} style={{ cursor: "pointer" }}>
//                 {sections[key].title}
//               </p>
//             ))}
//           </div>
//         </div>

//         <div className="right-column">
//           {Object.keys(sections).map(key => (
//             <div key={key} ref={el => (sectionRefs.current[key] = el)} style={{ marginBottom: "30px" }}>
//               <h3>{sections[key].title}</h3>
//               <div dangerouslySetInnerHTML={{ __html: decodeHTML(sections[key].content )}} />
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }









import React, { useEffect, useState, useRef } from "react";
import api from "../api";  // relative path to api.js
import Banner from "./Banner";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";

export default function ExtraCurricular() {
  const [sections, setSections] = useState({});
  const sectionRefs = useRef({});

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const res = await api.get("/api/extracurricular");
        setSections(res.data.data?.sections || {});
        toast.success("Extra Curricular content loaded!");
      } catch (err) {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch content",
        });
      }
    };
    fetchSections();
  }, []);

  const scrollToSection = (key) => {
    const ref = sectionRefs.current[key];
    if (ref) {
      ref.scrollIntoView({ behavior: "smooth" });
      toast(`Scrolled to ${sections[key].title}`);
    } else {
      Swal.fire({
        icon: "info",
        title: "Section not found",
        text: `Could not scroll to ${sections[key]?.title || key}`,
      });
    }
  };

  function decodeHTML(html) {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Banner />
      <div className="extra-page">
        <div className="left-column">
          <h2>Extra Curricular</h2>
          <div className="info-box">
            {Object.keys(sections).map((key) => (
              <p
                key={key}
                onClick={() => scrollToSection(key)}
                style={{ cursor: "pointer" }}
              >
                {sections[key].title}
              </p>
            ))}
          </div>
        </div>

        <div className="right-column">
          {Object.keys(sections).map((key) => (
            <div
              key={key}
              ref={(el) => (sectionRefs.current[key] = el)}
              style={{ marginBottom: "30px" }}
            >
              <h3>{sections[key].title}</h3>
              <div
                dangerouslySetInnerHTML={{
                  __html: decodeHTML(sections[key].content),
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

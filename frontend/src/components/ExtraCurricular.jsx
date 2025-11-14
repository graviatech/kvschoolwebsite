
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Banner from "./Banner";

export default function ExtraCurricular() {
  const [sections, setSections] = useState({});
  const sectionRefs = useRef({});

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/extracurricular");
        setSections(res.data.data?.sections || {});
      } catch {
        alert("Failed to fetch content");
      }
    };
    fetchSections();
  }, []);

  const scrollToSection = (key) => {
    sectionRefs.current[key]?.scrollIntoView({ behavior: "smooth" });
  };

  function decodeHTML(html) {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }

  return (
    <>
      <Banner />
      <div className="extra-page">
        <div className="left-column">
          <h2>Extra Curricular</h2>
          <div className="info-box">
            {Object.keys(sections).map(key => (
              <p key={key} onClick={() => scrollToSection(key)} style={{ cursor: "pointer" }}>
                {sections[key].title}
              </p>
            ))}
          </div>
        </div>

        <div className="right-column">
          {Object.keys(sections).map(key => (
            <div key={key} ref={el => (sectionRefs.current[key] = el)} style={{ marginBottom: "30px" }}>
              <h3>{sections[key].title}</h3>
              <div dangerouslySetInnerHTML={{ __html: decodeHTML(sections[key].content )}} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

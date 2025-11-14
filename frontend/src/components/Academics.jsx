
import React, { useEffect, useState, useRef } from "react";
import Banner from "./Banner";
import axios from "axios";
import "../styles/main.css";

export default function Academics() {
  const [data, setData] = useState({});
  const sectionRefs = useRef({});

  const sections = [
    { label: "Pedagogy", key: "pedagogy" },
    { label: "Annual Calendar", key: "annualCalendar" },
    { label: "Result", key: "result" },
    { label: "Curriculum", key: "curriculum" },
    { label: "Subjects", key: "subjects" },
    { label: "Faculty", key: "faculty" },
    { label: "Examination", key: "examination" },
    { label: "Examination Result", key: "examinationResult" },
  ];

  useEffect(() => {
    axios.get("http://localhost:5000/api/academics")
      .then(res => setData(res.data || {}))
      .catch(err => console.error(err));
  }, []);

  const scrollToSection = (label) => {
    const ref = sectionRefs.current[label];
    if (ref) ref.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const decodeHTML = (str) => {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = str;
    return textarea.value;
  };

  return (
    <>
      <Banner />
      <main className="main-container">
        <div className="two-column">
          <div className="left-column">
            <h2>Academics</h2>
            <div className="points-box">
              {sections.map(section => (
                <p key={section.label} style={{ cursor: "pointer" }} onClick={() => scrollToSection(section.label)}>
                  {section.label}
                </p>
              ))}
            </div>
          </div>
          <div className="right-column">
            {sections.map(section => (
              <div key={section.key} ref={el => (sectionRefs.current[section.label] = el)}>
                <h2>{section.label}</h2>
                <div className="ql-editor results-list" dangerouslySetInnerHTML={{ __html: decodeHTML(data[section.key] || "" )}} />
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}




















// https://www.w3schools.com/bootstrap5/tryit.asp?filename=trybs_default

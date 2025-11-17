
import React from "react";
import Banner from "./Banner"; // ✅ added
import "../styles/Download.css";

const Download = () => {
  return (
    <>
      <Banner /> {/* ✅ added */}
      <main className="main-container">
        <div className="two-column">
          <div className="left-column">
            <h2>Download</h2>
          </div>
          <div className="right-column">
            <h2>Download</h2>
            <p>
              <a href="https://noida.kvs.ac.in/en/admission-details/" target="_blank" rel="noreferrer">
                Application Form Click here to download
              </a>
            </p>
          </div>
        </div>
      </main>
      
    </>
  );
};

export default Download;

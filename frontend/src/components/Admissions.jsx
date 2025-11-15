

import React, { useRef, useEffect, useState } from "react";
// import axios from "axios";
import api from "../api";  // relative path to api.js

import Banner from "./Banner";
import toast, { Toaster } from "react-hot-toast";
import '../styles/main.css';

export default function Admissions() {
  const formRef = useRef(null);
  const onlineRef = useRef(null);
  const feeRef = useRef(null);

  const [feeStructure, setFeeStructure] = useState(null);

  useEffect(() => {
    const fetchFeeStructure = async () => {
      try {
        const res = await api.get("/api/fees");
        if (res.data.success) {
          setFeeStructure(res.data.data);
          toast.success("Admissions data loaded successfully!");
        } else {
          toast.error("Failed to load fee structure");
        }
      } catch (err) {
        console.error(err);
        toast.error("Error fetching fee structure");
      }
    };
    fetchFeeStructure();
  }, []);

  // const scrollToSection = (ref) => {
  //   ref.current.scrollIntoView({ behavior: "smooth" });
  // };

  const scrollToSection = (ref, sectionName) => {
    if (!ref.current) return;

    // Scroll smoothly
    ref.current.scrollIntoView({ behavior: "smooth", block: "start" });

    // Show toast popup
    toast(`Scrolling to ${sectionName}`);
  };
  

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Banner /> 
      <div className="admissions-page">
        <div className="left-column">
          <h2>Admissions</h2>
          <div className="info-box">
            <p onClick={() => scrollToSection(formRef, "Application Form")} style={{ cursor: "pointer" }}>Application Form</p>
            <p onClick={() => scrollToSection(onlineRef, "Apply Online")} style={{ cursor: "pointer" }}>Apply Online</p>
            <p onClick={() => scrollToSection(feeRef, "Fee Structure")} style={{ cursor: "pointer" }}>Fee Structure</p>
          </div>
        </div>

        <div className="right-column">
          <div ref={formRef}>
            <h2>Application Form</h2>
            <p>Welcome to the KV School online admission portal. Parents are requested to carefully fill out all the details in the application form, 
              including the student’s personal information, class applied for, and contact details. 
              Ensure that all required documents such as birth certificate, previous academic records, and passport-size photograph are uploaded correctly. 
              Incomplete forms may delay the admission process. After submitting the form, you will receive a confirmation email with the assigned admission number. 
              Please keep this admission number handy for all future correspondence regarding school admission and fee payments.
            </p>
          </div>

          <div ref={onlineRef} style={{ marginTop: "50px" }}>
            <h2>Apply Online</h2>
            <p>Parent can fill online admission form via the button below</p>
            <button onClick={() => window.open("/admission-form", "_blank")}>Apply Now</button>
          </div>

          <div ref={feeRef} style={{ marginTop: "50px" }}>
            <h2>Fee Structure ({feeStructure?.academicYear || "2025-26"})</h2>
            <div dangerouslySetInnerHTML={{ __html: feeStructure?.notes }} />

            {feeStructure?.items && (
              <table className="fee-table">
                <thead>
                  <tr>
                    <th>Particular</th>
                    <th>Amount (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {feeStructure.items.map((item) => (
                    <tr key={item.key}>
                      <td>{item.title}</td>
                      <td>{item.amount}</td>
                    </tr>
                  ))}
                  <tr className="fee-total">
                    <td><b>Total</b></td>
                    <td><b>₹{feeStructure.items.reduce((sum, i) => sum + i.amount, 0)}</b></td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

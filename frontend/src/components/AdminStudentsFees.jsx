

// // src/components/AdminStudentsFees.jsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";
// import "../styles/main.css";

// export default function AdminStudentsFees() {
//   const [students, setStudents] = useState([]);
//   const [selected, setSelected] = useState(null);
//   const [overrides, setOverrides] = useState({});
//   const [total, setTotal] = useState(0);
//   const [paid, setPaid] = useState(0);
//   const [remaining, setRemaining] = useState(0);

//   // Class-based fee heads
//   const getFeeKeysForClass = (cls) => {
//     const c = Number(cls);
//     if (c >= 1 && c <= 5) return ["development", "transport"];
//     if (c >= 6 && c <= 9) return ["tuition", "development", "transport"];
//     return ["exam", "tuition", "development"];
//   };

//   // Fetch all students
//   const fetchStudents = async () => {
//     try {
//       const res = await axios.get(
//         "http://localhost:5000/api/fees/admin/students"
//       );
//       setStudents(res.data.data || []);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to load students");
//     }
//   };

//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   const selectStudent = async (stu) => {
//     setSelected(stu);
//     try {
//       const res = await axios.get(
//         `http://localhost:5000/api/fees/student/${stu.admissionNo}`
//       );
//       if (res.data.success) {
//         const fee = res.data.data.fee.items || {};
//         const studentClass = stu.classApplied || stu.class;

//         // Get class-based fee heads
//         const keys = getFeeKeysForClass(studentClass);

//         const filtered = {};
//         keys.forEach((key) => {
//           filtered[key] = fee[key]?.amount || 0;
//         });

//         setOverrides(filtered);

//         // Compute totals
//         const totalAmt = Object.values(filtered).reduce((s, v) => s + (v || 0), 0);
//         setTotal(totalAmt);

//         const paidAmt = res.data.data.payments?.reduce((s, t) => s + (t.amount || 0), 0) || 0;
//         setPaid(paidAmt);
//         setRemaining(Math.max(0, totalAmt - paidAmt));
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to load fee details");
//     }
//   };

//   const updateOverride = (key, value) => {
//     const num = Number(value) || 0;
//     setOverrides((prev) => {
//       const updated = { ...prev, [key]: num };
//       const totalAmt = Object.values(updated).reduce((s, v) => s + v, 0);
//       setTotal(totalAmt);
//       setRemaining(Math.max(0, totalAmt - paid));
//       return updated;
//     });
//   };

//   const saveChanges = async () => {
//     if (!selected) return;
//     try {
//       const res = await axios.post("http://localhost:5000/api/fees/student", {
//         admissionNo: selected.admissionNo,
//         feeOverrides: overrides,
//       });
//       if (res.data.success) toast.success("Fee overrides updated!");
//       else toast.error(res.data.error || "Update failed");
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to save changes");
//     }
//   };

//   return (
//     <div className="admin-fees-page">
//       <Toaster />
//       <h2 style={{ color: "#003366", fontSize: "28px", marginBottom: "10px" }}>
//         Manage Student Fees
//       </h2>
//       <p>Edit class-based fees and set overrides for students.</p>

//       <div className="admin-fee-grid">
//         {/* Student List */}
//         <div className="student-list">
//           <h3 style={{ color: "#003366", fontSize: "20px", marginBottom: "8px" }}>All Students</h3>
//           {students.length === 0 && <p>No admissions found.</p>}
//           <ul>
//             {students.map((stu) => (
//               <li
//                 key={stu._id}
//                 onClick={() => selectStudent(stu)}
//                 className={selected?._id === stu._id ? "selected" : ""}
//               >
//                 <b>{stu.studentName}</b> ({stu.admissionNo})
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Fee Editor */}
//         <div className="fee-editor">
//           {!selected ? (
//             <p>Select a student to edit class-based fees.</p>
//           ) : (
//             <>
//               <h3 style={{ color: "#003366", fontSize: "20px", marginBottom: "8px" }}>
//                 Edit Fees for: {selected.studentName} — Class {selected.classApplied || selected.class}
//               </h3>
//               <table className="fee-table">
//                 <thead>
//                   <tr>
//                     <th>Fee Type</th>
//                     <th>Amount (₹)</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {Object.entries(overrides).map(([key, val]) => (
//                     <tr key={key}>
//                       <td>{key}</td>
//                       <td>
//                         <input
//                           type="number"
//                           value={val}
//                           onChange={(e) => updateOverride(key, e.target.value)}
//                         />
//                       </td>
//                     </tr>
//                   ))}
//                   <tr className="fee-total">
//                     <td><b>Total</b></td>
//                     <td><b>₹{total.toLocaleString()}</b></td>
//                   </tr>
//                   <tr>
//                     <td>Paid</td>
//                     <td>₹{paid.toLocaleString()}</td>
//                   </tr>
//                   <tr>
//                     <td>Remaining</td>
//                     <td>₹{remaining.toLocaleString()}</td>
//                   </tr>
//                 </tbody>
//               </table>
//               <button className="ad-stu-fee-save-btn" onClick={saveChanges}>Save Changes</button>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }






// src/components/AdminStudentsFees.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "../styles/main.css";

export default function AdminStudentsFees() {
  const [students, setStudents] = useState([]);
  const [selected, setSelected] = useState(null);
  const [overrides, setOverrides] = useState({});
  const [total, setTotal] = useState(0);
  const [paid, setPaid] = useState(0);
  const [remaining, setRemaining] = useState(0);

  // Class-based fee heads
  const getFeeKeysForClass = (cls) => {
    const c = Number(cls);
    if (c >= 1 && c <= 5) return ["development", "transport"];
    if (c >= 6 && c <= 9) return ["tuition", "development", "transport"];
    return ["exam", "tuition", "development"];
  };

  // Fetch all students
  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/fees/admin/students");
      setStudents(res.data.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load students");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const selectStudent = async (stu) => {
    setSelected(stu);
    try {
      const res = await axios.get(`http://localhost:5000/api/fees/student/${stu.admissionNo}`);
      if (res.data.success) {
        const fee = res.data.data.fee.items || {};
        const studentClass = stu.classApplied || stu.class;

        const keys = getFeeKeysForClass(studentClass);
        const filtered = {};
        keys.forEach((key) => {
          filtered[key] = fee[key]?.amount || 0;
        });

        setOverrides(filtered);

        const totalAmt = Object.values(filtered).reduce((s, v) => s + (v || 0), 0);
        setTotal(totalAmt);

        const paidAmt = res.data.data.payments?.reduce((s, t) => s + (t.amount || 0), 0) || 0;
        setPaid(paidAmt);
        setRemaining(Math.max(0, totalAmt - paidAmt));
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load fee details");
    }
  };

  const updateOverride = (key, value) => {
    const num = Number(value) || 0;
    setOverrides((prev) => {
      const updated = { ...prev, [key]: num };
      const totalAmt = Object.values(updated).reduce((s, v) => s + v, 0);
      setTotal(totalAmt);
      setRemaining(Math.max(0, totalAmt - paid));
      return updated;
    });
  };

  const addFeeType = () => {
    const key = prompt("Enter new fee type (e.g., 'library'):");
    if (!key) return;

    setOverrides((prev) => {
      if (prev[key]) {
        toast.error("Fee type already exists!");
        return prev;
      }
      const updated = { ...prev, [key]: 0 };
      const totalAmt = Object.values(updated).reduce((s, v) => s + v, 0);
      setTotal(totalAmt);
      setRemaining(Math.max(0, totalAmt - paid));
      return updated;
    });
  };

  const deleteFeeType = (key) => {
    setOverrides((prev) => {
      const updated = { ...prev };
      delete updated[key];
      const totalAmt = Object.values(updated).reduce((s, v) => s + v, 0);
      setTotal(totalAmt);
      setRemaining(Math.max(0, totalAmt - paid));
      return updated;
    });
  };

  const saveChanges = async () => {
    if (!selected) return;
    try {
      const res = await axios.post("http://localhost:5000/api/fees/student", {
        admissionNo: selected.admissionNo,
        feeOverrides: overrides,
      });
      if (res.data.success) toast.success("Fee structure updated!");
      else toast.error(res.data.error || "Update failed");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save changes");
    }
  };

  return (
    <div className="admin-fees-page">
      <Toaster />
      <h2 style={{ color: "#003366", fontSize: "28px", marginBottom: "10px" }}>
        Manage Student Fees
      </h2>
      <p>Edit class-based fees and set overrides for students.</p>

      <div className="admin-fee-grid">
        {/* Student List */}
        <div className="student-list">
          <h3 style={{ color: "#003366", fontSize: "20px", marginBottom: "8px" }}>All Students</h3>
          {students.length === 0 && <p>No admissions found.</p>}
          <ul>
            {students.map((stu) => (
              <li
                key={stu._id}
                onClick={() => selectStudent(stu)}
                className={selected?._id === stu._id ? "selected" : ""}
              >
                <b>{stu.studentName}</b> ({stu.admissionNo})
              </li>
            ))}
          </ul>
        </div>

        {/* Fee Editor */}
        <div className="fee-editor">
          {!selected ? (
            <p>Select a student to edit class-based fees.</p>
          ) : (
            <>
              <h3 style={{ color: "#003366", fontSize: "20px", marginBottom: "8px" }}>
                Edit Fees for: {selected.studentName} — Class {selected.classApplied || selected.class}
              </h3>

              <button style={{ marginBottom: 10 }} onClick={addFeeType}>Add Fee Type</button>

              <table className="fee-table">
                <thead>
                  <tr>
                    <th>Fee Type</th>
                    <th>Amount (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(overrides).map(([key, val]) => (
                    <tr key={key}>
                      <td>
                        {key}
                        <span
                          style={{ marginLeft: 10, color: "#e74c3c", cursor: "pointer" }}
                          onClick={() => deleteFeeType(key)}
                          title="Delete fee type"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </span>
                      </td>
                      <td>
                        <input
                          type="number"
                          value={val}
                          onChange={(e) => updateOverride(key, e.target.value)}
                        />
                      </td>
                    </tr>
                  ))}
                  <tr className="fee-total">
                    <td><b>Total</b></td>
                    <td><b>₹{total.toLocaleString()}</b></td>
                  </tr>
                  <tr>
                    <td>Paid</td>
                    <td>₹{paid.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td>Remaining</td>
                    <td>₹{remaining.toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>

              <button className="ad-stu-fee-save-btn" onClick={saveChanges}>Save Changes</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}












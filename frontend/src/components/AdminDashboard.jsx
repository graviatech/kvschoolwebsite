


// import React, { useEffect, useState } from "react";
// // import axios from "axios";
// import api from "../api";  // relative path to api.js


// export default function AdminDashboard() {
//   const [admissions, setAdmissions] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const token = localStorage.getItem("token");
//       const res = await api.get("/api/admin/admissions", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setAdmissions(res.data);
//     };
//     fetchData();
//   }, []);

//   return (
//     <div>
//       <h2 style={{color: "#003366", fontSize: "28px", marginBottom: "10px"}}>View Admissions</h2>
//       <table className="admin-table">
//         <thead>
//           <tr>
//             <th>Admission No.</th>
//             <th>Student Name</th>
//             <th>Class</th>
//             <th>View</th>
//           </tr>
//         </thead>
//         <tbody>
//           {admissions.map((a) => (
//             <tr key={a._id}>
//               <td>{a.admissionNo}</td>
//               <td>{a.studentName}</td>
//               <td>{a.classApplied}</td>
//               <td>
//                 <button className="ad-dash-view-btn" onClick={() => window.open(`/admin/admission/${a._id}`, "_blank")}>
//                   View
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }







import React, { useEffect, useState } from "react";
import api from "../api";  // relative path to api.js
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";
import "../styles/AdminDashboard.css";

export default function AdminDashboard() {
  const [admissions, setAdmissions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/api/admin/admissions", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAdmissions(res.data);
        toast.success("Admissions loaded successfully!");
      } catch (err) {
        console.error(err);
        toast.error("Failed to load admissions");
      }
    };
    fetchData();
  }, []);

  const handleView = (id) => {
    Swal.fire({
      title: "Open Admission Details?",
      text: "You will be redirected to the admission page.",
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Yes, open",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        window.open(`/admin/admission/${id}`, "_blank");
      }
    });
  };

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <h2 style={{ color: "#003366", fontSize: "28px", marginBottom: "10px" }}>
        View Admissions
      </h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Admission No.</th>
            <th>Student Name</th>
            <th>Class</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {admissions.map((a) => (
            <tr key={a._id}>
              <td>{a.admissionNo}</td>
              <td>{a.studentName}</td>
              <td>{a.classApplied}</td>
              <td>
                <button
                  className="ad-dash-view-btn"
                  onClick={() => handleView(a._id)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

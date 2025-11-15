

// import React, { useEffect, useState } from "react";
// // import axios from "axios";
// import api from "../api";  // relative path to api.js

// import "../styles/main.css";

// export default function FeeStructure() {
//   const [fee, setFee] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     api
//       .get("/api/fees")
//       .then((res) => {
//         if (res.data.success) setFee(res.data.data);
//       })
//       .catch((err) => console.error("Error loading fee structure:", err))
//       .finally(() => setLoading(false));
//   }, []);

//   if (loading) return <p className="loading-text">Loading fee structure...</p>;
//   if (!fee) return <p className="loading-text">No fee data found.</p>;

//   const total = fee.items.reduce((sum, item) => sum + (item.amount || 0), 0);

//   return (
//     <div className="fee-structure-container">
//       <div className="fee-card">
//         <h2 className="page-title">Fee Structure ({fee.academicYear})</h2>

//         <div
//           className="fee-description"
//           dangerouslySetInnerHTML={{ __html: fee.notes }}
//         />

//         <div className="fee-table-container">
//           <table className="fee-table">
//             <thead>
//               <tr>
//                 <th>Particulars</th>
//                 <th>Amount (₹)</th>
//               </tr>
//             </thead>
//             <tbody>
//               {fee.items.map((item) => (
//                 <tr key={item._id}>
//                   <td>{item.title}</td>
//                   <td>₹{item.amount.toLocaleString()}</td>
//                 </tr>
//               ))}
//               <tr className="total-row">
//                 <td><strong>Total</strong></td>
//                 <td><strong>₹{total.toLocaleString()}</strong></td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }






import React, { useEffect, useState } from "react";
import api from "../api";  // relative path to api.js
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import "../styles/main.css";

export default function FeeStructure() {
  const [fee, setFee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFee = async () => {
      try {
        const res = await api.get("/api/fees");
        if (res.data.success) {
          setFee(res.data.data);
          toast.success("Fee structure loaded successfully!");
        } else {
          Swal.fire({
            icon: "info",
            title: "No Data",
            text: "No fee data found.",
          });
        }
      } catch (err) {
        console.error("Error loading fee structure:", err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load fee structure",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchFee();
  }, []);

  if (loading) return <p className="loading-text">Loading fee structure...</p>;
  if (!fee) return <p className="loading-text">No fee data found.</p>;

  const total = fee.items.reduce((sum, item) => sum + (item.amount || 0), 0);

  return (
    <div className="fee-structure-container">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="fee-card">
        <h2 className="page-title">Fee Structure ({fee.academicYear})</h2>

        <div
          className="fee-description"
          dangerouslySetInnerHTML={{ __html: fee.notes }}
        />

        <div className="fee-table-container">
          <table className="fee-table">
            <thead>
              <tr>
                <th>Particulars</th>
                <th>Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              {fee.items.map((item) => (
                <tr key={item._id}>
                  <td>{item.title}</td>
                  <td>₹{item.amount.toLocaleString()}</td>
                </tr>
              ))}
              <tr className="total-row">
                <td><strong>Total</strong></td>
                <td><strong>₹{total.toLocaleString()}</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
















// // frontend/src/components/ParentFeePage.jsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";
// import Swal from "sweetalert2";






// export default function ParentFeePage() {
//   const [admissionNo, setAdmissionNo] = useState("");
//   const [summary, setSummary] = useState(null);
//   const [amount, setAmount] = useState("");
//   const [structure, setStructure] = useState(null); // overall structure

//   // Only main recurring fees
//   const mainFeeKeys = ["tuition", "development", "computer", "transport", "sports", "artMusic"];

//   // Load overall school fee structure
//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/fees")
//       .then((res) => {
//         if (res.data.success) setStructure(res.data.data);
//       })
//       .catch(() => toast.error("Failed to load overall fee structure"));
//   }, []);

//   // Fetch fee summary for admitted student
//   const fetchFee = async () => {
//     if (!admissionNo.trim()) return toast.error("Please enter admission number");
//     try {
//       const res = await axios.get(
//         `http://localhost:5000/api/fees/student/${admissionNo}`
//       );
//       if (res.data.success && res.data.data) {
//         setSummary(res.data.data);
//         toast.success("Fee record loaded!");
//       } else {
//         setSummary(null);
//         toast.error("No record found!");
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to load fee structure");
//     }  
//   };

//   // Simulated pay function
//   const payNow = async () => {
//     const amt = Number(amount);
//     if (!amt || amt <= 0) return toast.error("Enter valid amount");

//     const ok = await Swal.fire({
//       title: `Pay ₹${amt}?`,
//       text: "Proceed to simulated payment?",
//       showCancelButton: true,
//     });
//     if (!ok.isConfirmed) return;

//     try {
//       // Prepare breakdown for main fees only (for demo, full remaining distributed equally)
//       const feeItems = summary.fee.items;
//       const remainingMain = mainFeeKeys.reduce((sum, k) => {
//         return sum + (feeItems[k]?.amount || 0);
//       }, 0);

//       const breakdown = {};
//       let remainingAmount = amt;

//       // Distribute payment to main fees in order
//       mainFeeKeys.forEach((k) => {
//         if (!feeItems[k]) return;
//         const rem = Math.max(0, feeItems[k].amount - (summary.payments?.reduce((pSum, p) => pSum + (p.breakdown?.[k] || 0), 0) || 0));
//         if (remainingAmount >= rem) {
//           breakdown[k] = rem;
//           remainingAmount -= rem;
//         } else {
//           breakdown[k] = remainingAmount;
//           remainingAmount = 0;
//         }
//       });

//       const res = await axios.post("http://localhost:5000/api/fees/pay", {
//         admissionNo,
//         amount: amt,
//         method: "simulated",
//         breakdown,
//       });

//       if (res.data.success) {
//         // Refresh data to update remaining
//         const updated = await axios.get(
//           `http://localhost:5000/api/fees/student/${admissionNo}`
//         );

//         const feeData = updated.data?.data?.fee.items;
//         // Calculate remaining main fees only
//         const paidMain = mainFeeKeys.reduce((sum, k) => {
//           const totalPaid = updated.data?.data?.payments?.reduce(
//             (s, t) => s + (t.breakdown?.[k] || 0),
//             0
//           );
//           return sum + (totalPaid || 0);
//         }, 0);

//         const totalMain = mainFeeKeys.reduce(
//           (sum, k) => sum + (feeData[k]?.amount || 0),
//           0
//         );

//         const remainingMain = Math.max(0, totalMain - paidMain);

//         // Show payment summary
//         await Swal.fire({
//           icon: "success",
//           title: "Payment Successful!",
//           html: `
//             <p><b>Amount Paid:</b> ₹${amt}</p>
//             <p><b>Remaining (Main Fees):</b> ₹${remainingMain}</p>
//           `,
//           confirmButtonText: "OK",
//         });

//         // Reset
//         // setSummary(updated.data.data);
//         // setAmount("");
//         setSummary(null);
//         setAdmissionNo("");
//         setAmount("");
//       } else {
//         toast.error(res.data.error || "Payment failed");
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Payment failed");
//     }
//   };

//   return (
//     <div className="fee-page">
//       <Toaster />

//       {/* --------- Overall fee structure (all fees) --------- */}
//       {structure && (
//         <div className="overall-structure">
//           <h2>School Fee Structure ({structure.academicYear})</h2>
//           <div dangerouslySetInnerHTML={{ __html: structure.notes }} />
//           <table className="fee-table">
//             <thead>
//               <tr>
//                 <th>Particulars</th>
//                 <th>Amount (₹)</th>
//               </tr>
//             </thead>
//             <tbody>
//               {structure.items.map((item) => (
//                 <tr key={item.key}>
//                   <td>{item.title}</td>
//                   <td>{item.amount}</td>
//                 </tr>
//               ))}
//               <tr className="fee-total">
//                 <td><b>Total</b></td>
//                 <td>
//                   <b>₹{structure.items.reduce((s, i) => s + i.amount, 0)}</b>
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* --------- Admission input box --------- */}
//       <div className="search-box" style={{ marginTop: "30px" }}>
//         <h3>💳 Pay School Fees</h3>
//         <input
//           type="text"
//           style={{width: "260px", height: "30px"}}
//           value={admissionNo}
//           onChange={(e) => setAdmissionNo(e.target.value)}
//           placeholder="Enter Admission Number (e.g. KV-000000)"
//         />
//         <button className="search-btn" onClick={fetchFee}>Search</button>
//       </div>

//       {/* --------- Message when not found --------- */}
//       {!summary && (
//         <p className="info-text">
//           Enter admission number to view personal fee details.
//         </p>
//       )}

//       {/* --------- Student-specific main fees --------- */}
//       {summary && (
//         <div className="fee-card">
//           <h3>
//             Fee Structure for {summary.student.studentName} (
//             {summary.student.admissionNo})
//           </h3>
//           <table className="fee-table">
//             <thead>
//               <tr>
//                 <th>Particulars</th>
//                 <th>Amount (₹)</th>
//               </tr>
//             </thead>
//             <tbody>
//               {mainFeeKeys.map((key) => (
//                 <tr key={key}>
//                   <td>{summary.fee.items[key]?.title}</td>
//                   <td>₹{summary.fee.items[key]?.amount}</td>
//                 </tr>
//               ))}
//               <tr className="fee-total">
//                 <td><b>Total</b></td>
//                 <td>
//                   <b>
//                     ₹
//                     {mainFeeKeys
//                       .reduce(
//                         (sum, k) => sum + (summary.fee.items[k]?.amount || 0),
//                         0
//                       )
//                       .toLocaleString()}
//                   </b>
//                 </td>
//               </tr>

//               {/* Paid & Remaining for main fees */}
//               <tr>
//                 <td>Paid</td>
//                 <td>
//                   ₹
//                   {mainFeeKeys
//                     .reduce(
//                       (sum, k) =>
//                         sum +
//                         (summary.payments?.reduce(
//                           (s, t) => s + (t.breakdown?.[k] || 0),
//                           0
//                         ) || 0),
//                       0
//                     )
//                     .toLocaleString()}
//                 </td>
//               </tr>
//               <tr>
//                 <td>Remaining</td>
//                 <td>
//                   ₹
//                   {mainFeeKeys
//                     .reduce(
//                       (sum, k) =>
//                         sum +
//                         (summary.fee.items[k]?.amount || 0) -
//                         (summary.payments?.reduce(
//                           (s, t) => s + (t.breakdown?.[k] || 0),
//                           0
//                         ) || 0),
//                       0
//                     )
//                     .toLocaleString()}
//                 </td>
//               </tr>
//             </tbody>
//           </table>

//           <div className="pay-section">
//             <input
//               type="number"
//               value={amount}
//               onChange={(e) => setAmount(e.target.value)}
//               placeholder="Enter amount to pay"
//             />
//             <button onClick={payNow}>Pay Now</button>
//             <button
//               onClick={() =>
//                 setAmount(
//                   mainFeeKeys.reduce(
//                     (sum, k) =>
//                       sum +
//                       (summary.fee.items[k]?.amount || 0) -
//                       (summary.payments?.reduce(
//                         (s, t) => s + (t.breakdown?.[k] || 0),
//                         0
//                       ) || 0),
//                     0
//                   )
//                 )
//               }
//               style={{ marginLeft: "10px" }}
//             >
//               Pay Full
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



















// real payment system

// import React, { useState } from "react";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";

// export default function ParentFeePage() {
//   const [admissionNo, setAdmissionNo] = useState("");
//   const [summary, setSummary] = useState(null);
//   const [amount, setAmount] = useState("");

//   const fetchFee = async () => {
//     if (!admissionNo.trim()) return toast.error("Please enter admission number");
//     try {
//       const res = await axios.get(`http://localhost:5000/api/fees/student/${admissionNo}`);
//       if (res.data.success && res.data.data) {
//         setSummary(res.data.data);
//         toast.success("Fee record loaded!");
//       } else {
//         setSummary(null);
//         toast.error("No record found!");
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to load fee structure");
//     }
//   };

//   // 🧾 Razorpay Payment Integration
//   const payNow = async () => {
//     const amt = Number(amount);
//     if (!amt || amt <= 0) return toast.error("Enter valid amount");

//     try {
//       // Step 1: Create Razorpay order
//       const orderRes = await axios.post("http://localhost:5000/api/fees/create-order", { amount: amt });
//       const { order } = orderRes.data;

//       // Step 2: Open Razorpay Checkout
//       const options = {
//         key: "rzp_test_YourKeyID", // ✅ Replace with your Razorpay test key
//         amount: order.amount,
//         currency: "INR",
//         name: "KV School",
//         description: "School Fee Payment",
//         order_id: order.id,
//         handler: async function (response) {
//           // Step 3: Verify payment on server
//           const verifyRes = await axios.post("http://localhost:5000/api/fees/verify", {
//             razorpay_order_id: response.razorpay_order_id,
//             razorpay_payment_id: response.razorpay_payment_id,
//             razorpay_signature: response.razorpay_signature,
//             admissionNo,
//             amount: amt,
//           });

//           if (verifyRes.data.success) {
//             toast.success("Payment successful!");
//             fetchFee();
//           } else {
//             toast.error("Payment verification failed");
//           }
//         },
//         prefill: {
//           name: summary?.student?.studentName || "Parent",
//           email: summary?.student?.email || "test@example.com",
//           contact: summary?.student?.phone || "9999999999",
//         },
//         theme: { color: "#1E90FF" },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (err) {
//       console.error(err);
//       toast.error("Payment initiation failed");
//     }
//   };

//   return (
//     <div className="fee-page">
//       <Toaster />
//       <h2>💳 Pay School Fees</h2>

//       <div className="search-box">
//         <input
//           type="text"
//           value={admissionNo}
//           onChange={(e) => setAdmissionNo(e.target.value)}
//           placeholder="Enter Admission Number (e.g. KV-668272)"
//         />
//         <button onClick={fetchFee}>Search</button>
//       </div>

//       {!summary && <p className="info-text">Enter admission number to view fee details.</p>}

//       {summary && (
//         <div className="fee-card">
//           <h3>Fee Structure ({summary.fee?.academicYear || "2025-26"})</h3>

//           <table className="fee-table">
//             <thead>
//               <tr>
//                 <th>Particulars</th>
//                 <th>Amount (₹)</th>
//               </tr>
//             </thead>
//             <tbody>
//               {Object.keys(summary.fee.items).map((key) => (
//                 <tr key={key}>
//                   <td>{summary.fee.items[key].title}</td>
//                   <td>{summary.fee.items[key].amount}</td>
//                 </tr>
//               ))}
//               <tr className="fee-total">
//                 <td><b>Total</b></td>
//                 <td><b>₹{summary.fee.total}</b></td>
//               </tr>
//               <tr>
//                 <td>Paid</td>
//                 <td>₹{summary.fee.paid}</td>
//               </tr>
//               <tr>
//                 <td>Remaining</td>
//                 <td>₹{summary.fee.remaining}</td>
//               </tr>
//             </tbody>
//           </table>

//           <div className="pay-section">
//             <input
//               type="number"
//               value={amount}
//               onChange={(e) => setAmount(e.target.value)}
//               placeholder="Enter amount to pay"
//             />
//             <button onClick={payNow}>Pay Now</button>
//             <button onClick={() => setAmount(summary.fee.remaining)}>Pay Full</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

















// // src/components/ParentFeePage.jsx
// import React, { useState } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import toast, { Toaster } from "react-hot-toast";
// import "../styles/main.css";


// export default function ParentFeePage() {
//   const [admissionNo, setAdmissionNo] = useState("");
//   const [data, setData] = useState(null);
//   const [amount, setAmount] = useState("");

//   // helper: class-based fee heads
//   const getFeeKeysForClass = (cls) => {
//     const c = Number(cls);
//     if (c >= 1 && c <= 5) return ["development", "transport"];
//     if (c >= 6 && c <= 9) return ["tuition", "development", "transport"];
//     return ["exam", "tuition", "development"];
//   };

//   const fetchFee = async () => {
//     if (!admissionNo.trim()) return toast.error("Please enter admission number");
//     try {
//       const res = await axios.get(`http://localhost:5000/api/fees/student/${admissionNo}`);
//       if (res.data.success) {
//         setData(res.data.data);
//         toast.success("Record found!");
//       } else toast.error("No record found");
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to fetch record");
//     }
//   };

//   const payNow = async () => {
//     const amt = Number(amount);
//     if (!amt || amt <= 0) return toast.error("Enter valid amount");

//     const ok = await Swal.fire({
//       title: `Pay ₹${amt}?`,
//       text: "Proceed to payment?",
//       icon: "question",
//       showCancelButton: true,
//       confirmButtonText: "Yes, Pay",
//       cancelButtonText: "Cancel",
//     });
//     if (!ok.isConfirmed) return;

//     try {
//       const res = await axios.post("http://localhost:5000/api/fees/pay", {
//         admissionNo,
//         amount: amt,
//         method: "parent",
//       });

//       if (res.data.success) {
//         // refresh latest data for updated totals
//         const refreshed = await axios.get(
//           `http://localhost:5000/api/fees/student/${admissionNo}`
//         );
//         const dataNew = refreshed.data.data;
//         const student = dataNew?.student || {};
//         const items = dataNew?.fee?.items || {};
//         const keys = getFeeKeysForClass(student.classApplied || student.class);
//         const paid = dataNew?.payments?.reduce((s, t) => s + (t.amount || 0), 0) || 0;
//         const total = keys.reduce((s, k) => s + (items[k]?.amount || 0), 0);
//         const remaining = Math.max(0, total - paid);

//         // show popup with updated info
//         await Swal.fire({
//           title: "✅ Payment Successful!",
//           html: `
//           <p><b>Paid:</b> ₹${paid.toLocaleString()}</p>
//           <p><b>Remaining:</b> ₹${remaining.toLocaleString()}</p>
//           `,
//           icon: "success",
//           confirmButtonText: "OK",
//         });

//         // after user clicks OK, reset page
//         setAmount("");
//         setAdmissionNo("");
//         setData(null);
//       } else {
//         toast.error(res.data.error || "Payment failed");
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Payment failed");
//     }
//   };


//   const renderFeeTable = () => {
//     if (!data) return null;
//     const student = data.student;
//     const items = data.fee?.items || {};
//     const keys = getFeeKeysForClass(student.classApplied || student.class);
//     const paid = data.payments?.reduce((s, t) => s + (t.amount || 0), 0) || 0;
//     const total = keys.reduce((s, k) => s + (items[k]?.amount || 0), 0);
//     const remaining = Math.max(0, total - paid);

//     return (
//       <div className="fee-card">
//         <h3>{student.studentName} — Class {student.classApplied || student.class}</h3>
//         <table className="fee-table">
//           <thead>
//             <tr>
//               <th>Particular</th>
//               <th>Amount (₹)</th>
//             </tr>
//           </thead>
//           <tbody>
//             {keys.map((k) => (
//               <tr key={k}>
//                 <td>{items[k]?.title || k}</td>
//                 <td>₹{items[k]?.amount?.toLocaleString() || 0}</td>
//               </tr>
//             ))}
//             <tr className="fee-total"><td><b>Total</b></td><td><b>₹{total.toLocaleString()}</b></td></tr>
//             <tr><td>Paid</td><td>₹{paid.toLocaleString()}</td></tr>
//             <tr><td>Remaining</td><td>₹{remaining.toLocaleString()}</td></tr>
//           </tbody>
//         </table>

//         <div className="pay-section">
//           <input
//             type="number"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//             placeholder="Enter amount"
//           />
//           <button onClick={payNow}>Pay Now</button>
//           <button
//             className="secondary-btn"
//             onClick={() => setAmount(remaining)}
//           >
//             Pay Full
//           </button>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="fee-page">
//       <Toaster />
//       <div className="fee-container">
//         <h2>💳 Pay School Fees</h2>
//         <div className="search-box">
//           <input
//             type="text"
//             placeholder="Enter Admission No."
//             value={admissionNo}
//             onChange={(e) => setAdmissionNo(e.target.value)}
//           />
//           <button onClick={fetchFee}>Search</button>
//         </div>
//         {renderFeeTable()}
//       </div>
//     </div>
//   );
// }











// src/components/ParentFeePage.jsx
import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";
import "../styles/main.css";

export default function ParentFeePage() {
  const [admissionNo, setAdmissionNo] = useState("");
  const [data, setData] = useState(null);
  const [amount, setAmount] = useState("");

  // Fetch student fee details including admin updates and overrides
  const fetchFee = async () => {
    if (!admissionNo.trim()) return toast.error("Please enter admission number");
    try {
      const res = await axios.get(`http://localhost:5000/api/fees/student/${admissionNo}`);
      if (res.data.success) {
        setData(res.data.data);
        toast.success("Record found!");
      } else toast.error("No record found");
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch record");
    }
  };

  const payNow = async () => {
    const amt = Number(amount);
    if (!amt || amt <= 0) return toast.error("Enter valid amount");

    const ok = await Swal.fire({
      title: `Pay ₹${amt}?`,
      text: "Proceed to payment?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Pay",
      cancelButtonText: "Cancel",
    });
    if (!ok.isConfirmed) return;

    try {
      const res = await axios.post("http://localhost:5000/api/fees/pay", {
        admissionNo,
        amount: amt,
        method: "parent",
      });

      if (res.data.success) {
        // refresh latest data for updated totals
        const refreshed = await axios.get(
          `http://localhost:5000/api/fees/student/${admissionNo}`
        );
        const dataNew = refreshed.data.data;
        setData(dataNew);
        setAmount("");

        const student = dataNew?.student || {};
        const items = dataNew?.fee?.items || {};
        const paid = dataNew?.payments?.reduce((s, t) => s + (t.amount || 0), 0) || 0;
        const total = Object.keys(items).reduce((s, k) => s + (items[k]?.amount || 0), 0);
        const remaining = Math.max(0, total - paid);

        // show popup with updated info
        await Swal.fire({
          title: "✅ Payment Successful!",
          html: `
            <p><b>Paid:</b> ₹${paid.toLocaleString()}</p>
            <p><b>Remaining:</b> ₹${remaining.toLocaleString()}</p>
          `,
          icon: "success",
          confirmButtonText: "OK",
        });

      } else {
        toast.error(res.data.error || "Payment failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Payment failed");
    }
  };

  // Render dynamic fee table
  const renderFeeTable = () => {
    if (!data) return null;

    const student = data.student;
    const items = data.fee?.items || {};
    const keys = Object.keys(items); // dynamic keys from backend
    const paid = data.payments?.reduce((s, t) => s + (t.amount || 0), 0) || 0;
    const total = keys.reduce((s, k) => s + (items[k]?.amount || 0), 0);
    const remaining = Math.max(0, total - paid);

    return (
      <div className="fee-card">
        <h3>{student.studentName} — Class {student.classApplied || student.class}</h3>
        <table className="fee-table">
          <thead>
            <tr>
              <th>Particular</th>
              <th>Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            {keys.map((k) => (
              <tr key={k}>
                <td>{items[k]?.title || k}</td>
                <td>₹{items[k]?.amount?.toLocaleString() || 0}</td>
              </tr>
            ))}
            <tr className="fee-total"><td><b>Total</b></td><td><b>₹{total.toLocaleString()}</b></td></tr>
            <tr><td>Paid</td><td>₹{paid.toLocaleString()}</td></tr>
            <tr><td>Remaining</td><td>₹{remaining.toLocaleString()}</td></tr>
          </tbody>
        </table>

        <div className="pay-section">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
          />
          <button onClick={payNow}>Pay Now</button>
          <button
            className="secondary-btn"
            onClick={() => setAmount(remaining)}
          >
            Pay Full
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="fee-page">
      <Toaster />
      <div className="fee-container">
        <h2>💳 Pay School Fees</h2>
        <div className="search-box">
          <input
            type="text"
            placeholder="Enter Admission No."
            value={admissionNo}
            onChange={(e) => setAdmissionNo(e.target.value)}
          />
          <button onClick={fetchFee}>Search</button>
        </div>
        {renderFeeTable()}
      </div>
    </div>
  );
}





























































































































































































































































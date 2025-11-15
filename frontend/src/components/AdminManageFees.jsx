// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import ReactQuill from "react-quill";
// import toast, { Toaster } from "react-hot-toast";
// import "react-quill/dist/quill.snow.css";





// export default function AdminManageFees() {
//   const [fs, setFs] = useState({
//     academicYear: "2025-26",
//     notes: "",
//     items: [
//       // example
//       // { key: "tuition", title: "Tuition Fee", amount: 30000, description: "" }
//     ]
//   });

//   useEffect(() => {
//     axios.get("http://localhost:5000/api/fees").then(res => {
//       if (res.data.success) setFs(res.data.data);
//     }).catch(err => {
//       console.error(err);
//       toast.error("Failed to load fee structure");
//     });
//   }, []);

//   const addItem = () => {
//     setFs(prev => ({ ...prev, items: [...prev.items, { key: Date.now().toString(), title: "New Item", amount: 0, description: "" }] }));
//   };

//   const updateItem = (index, field, value) => {
//     setFs(prev => {
//       const items = [...prev.items];
//       items[index] = { ...items[index], [field]: value };
//       return { ...prev, items };
//     });
//   };

//   const deleteItem = (index) => {
//     setFs(prev => ({ ...prev, items: prev.items.filter((_, i) => i !== index) }));
//   };

//   const handleSave = async () => {
//     try {
//       const token = localStorage.getItem("token"); // ensure admin auth
//       const res = await axios.put("http://localhost:5000/api/fees", fs, { headers: { Authorization: `Bearer ${token}` } });
//       if (res.data.success) {
//         toast.success("Fee structure saved");
//       } else {
//         toast.error(res.data.error || "Save failed");
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Save failed");
//     }
//   };

//   return (
//     <div className="admin-page">
//       <Toaster />
//       <h2>Manage Fee Structure</h2>

//       <div style={{color: "#003366"}}>
//         <label>Academic Year</label>
//         <input value={fs.academicYear || ""} onChange={e => setFs({ ...fs, academicYear: e.target.value })} />
//       </div>

//       <div>
//         <h3>Overview / Notes</h3>
//         <ReactQuill value={fs.notes || ""} onChange={val => setFs(prev => ({ ...prev, notes: val }))} />
//       </div>

//       <h3>Fee Items</h3>
//       {fs.items.map((it, idx) => (
//         <div key={it.key} className="fee-item" style={{ border: "1px solid #ccc", padding: 8, marginBottom: 8 }}>
//           <input value={it.title} onChange={e => updateItem(idx, "title", e.target.value)} placeholder="Title" />
//           <input type="number" value={it.amount} onChange={e => updateItem(idx, "amount", Number(e.target.value))} placeholder="Amount" />
//           <div>
//             <ReactQuill theme="snow" value={it.description || ""} onChange={val => updateItem(idx, "description", val)} />
//           </div>
//           <button className="delete-btn" onClick={() => deleteItem(idx)}>Delete</button>
//         </div>
//       ))}

//       <button className="add-item-btn" onClick={addItem}>Add Item</button>
//       <hr />
//       <button onClick={handleSave}>Save Fee Structure</button>
//     </div>
//   );
// }











import React, { useEffect, useState } from "react";
// import axios from "axios";
import api from "../api";  // relative path to api.js

import ReactQuill from "react-quill";
import toast, { Toaster } from "react-hot-toast";
import "react-quill/dist/quill.snow.css";
import "../styles/main.css"; // We'll create this

export default function AdminManageFees() {
  const [fs, setFs] = useState({
    academicYear: "2025-26",
    notes: "",
    items: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/api/fees")
      .then(res => {
        if (res.data.success) setFs(res.data.data);
        toast.success("Fee Structure loaded successfully!");
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        toast.error("Failed to load fee structure");
        setLoading(false);
      });
  }, []);

  const addItem = () => {
    setFs(prev => ({
      ...prev,
      items: [
        ...prev.items,
        { key: Date.now().toString(), title: "", amount: 0, description: "" }
      ]
    }));
  };

  const updateItem = (index, field, value) => {
    setFs(prev => {
      const items = [...prev.items];
      items[index] = { ...items[index], [field]: value };
      return { ...prev, items };
    });
  };

  const deleteItem = (index) => {
    setFs(prev => ({ ...prev, items: prev.items.filter((_, i) => i !== index) }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.put("/api/fees", fs, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) toast.success("Fee structure saved");
      else toast.error(res.data.error || "Save failed");
    } catch (err) {
      console.error(err);
      toast.error("Save failed");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="admin-fees-container">
      <Toaster />
      <h2>Manage Fee Structure</h2>

      <div className="form-group">
        <label>Academic Year</label>
        <input
          type="text"
          value={fs.academicYear}
          onChange={e => setFs({ ...fs, academicYear: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label>Overview / Notes</label>
        <ReactQuill
          theme="snow"
          value={fs.notes || ""}
          onChange={val => setFs(prev => ({ ...prev, notes: val }))}
        />
      </div>

      <h3>Fee Items</h3>
      <div className="fee-items">
        {fs.items.map((it, idx) => (
          <div key={it.key} className="fee-item-card">
            {/* Delete Icon Top-Right */}
            <span className="delete-icon" onClick={() => deleteItem(idx)} title="Delete Fee Item">
              {/* &times; */}
              <i class="fa-solid fa-trash"></i>
            </span>

            <input
              className="fee-title"
              value={it.title}
              placeholder="Fee Title"
              onChange={e => updateItem(idx, "title", e.target.value)}
            />
            <input
              className="fee-amount"
              type="number"
              value={it.amount}
              placeholder="Amount"
              onChange={e => updateItem(idx, "amount", Number(e.target.value))}
            />
            <label>Description</label>
            <ReactQuill
              theme="snow"
              value={it.description || ""}
              onChange={val => updateItem(idx, "description", val)}
            />
          </div>
        ))}

      </div>

      <button className="add-item-btn" onClick={addItem}>Add Fee Item</button>
      <hr />
      <button className="save-btn" onClick={handleSave}>Save Fee Structure</button>
    </div>
  );
}

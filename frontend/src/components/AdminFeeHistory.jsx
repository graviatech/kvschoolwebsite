// src/components/AdminFeeHistory.jsx
import React, { useEffect, useState } from "react";
// import axios from "axios";
import api from "../api";  // relative path to api.js

import toast, { Toaster } from "react-hot-toast";
import "../styles/main.css";

export default function AdminFeeHistory() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all fee transactions from backend
  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/fees/transactions");
      if (res.data.success) {
        setTransactions(res.data.data);
      } else {
        toast.error("Failed to fetch transactions");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
    // optional: auto-refresh every 10s to see new payments
    const interval = setInterval(fetchTransactions, 10000);
    return () => clearInterval(interval);
  }, []);

  const renderTable = () => {
    if (transactions.length === 0) {
      return <p>No payments recorded yet.</p>;
    }

    return (
      <table className="fee-table">
        <thead>
          <tr>
            <th>Admission No.</th>
            <th>Student Name</th>
            <th>Payment Date</th>
            <th>Amount Paid (₹)</th>
            <th>Payment Method</th>
            <th>Remaining After Payment (₹)</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx._id}>
              <td>{tx.admissionNo}</td>
              <td>{tx.studentName}</td>
              <td>{new Date(tx.createdAt).toLocaleString()}</td>
              <td>₹{tx.amount?.toLocaleString()}</td>
              <td>{tx.paymentMethod}</td>
              <td>₹{tx.remainingAfter?.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="fee-page">
      <Toaster />
      <div className="fee-container">
        <h2>Fee Payment History</h2>
        {loading ? <p>Loading...</p> : renderTable()}
      </div>
    </div>
  );
}


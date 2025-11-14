// models/FeeTransaction.js
import mongoose from "mongoose";

const FeeTransactionSchema = new mongoose.Schema({
  admissionNo: String,
  studentName: String,
  amount: Number,           // paid amount in this transaction
  paymentMethod: String,    // "card", "netbanking", "cash", "simulated"
  gatewayRef: String,       // optional
  breakdown: { type: Object, default: {} }, // { tuition: 2000, lab: 500 }
  totalFee: Number,         // original net total at time of payment
  remainingAfter: Number,   // remaining after this payment
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("FeeTransaction", FeeTransactionSchema);







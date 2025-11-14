// routes/fees.js
import express from "express";
import FeeStructure from "../models/FeeStructure.js";
// import Student from "../models/Student.js";
import Admission from "../models/Admission.js";

import FeeTransaction from "../models/FeeTransaction.js";

const router = express.Router();

// GET fee structure (admin + public)
router.get("/", async (req, res) => {
  try {
    let fs = await FeeStructure.findOne();
    if (!fs) {
      // create default if not exists
      fs = await FeeStructure.create({
        academicYear: "2025-26",
        notes: "<p>Fee structure for 2025-26</p>",
        items: [
          // 1. Admission / One-Time Fees
        { key: "registration", title: "Registration Fee", amount: 1000, description: "<p>Charged at Admission</p>" },
        { key: "admission", title: "Admission Fee", amount: 10000, description: "<p>Charged at Admission / Re-admission</p>" },
        { key: "securityDeposit", title: "Security Deposit / Caution Money", amount: 5000, description: "<p>Refundable deposit for books/lab/assets</p>" },

        // 2. Academic Fees
        { key: "tuition", title: "Tuition Fee", amount: 30000, description: "<p>Main recurring fee</p>" },
        { key: "development", title: "Development / Infrastructure Fee", amount: 5000, description: "<p>School maintenance / labs / library</p>" },
        { key: "exam", title: "Exam / Assessment Fee", amount: 2000, description: "<p>Charged for exams</p>" },
        { key: "computer", title: "Computer / Lab Fee", amount: 1500, description: "<p>Usage of computer / lab facilities</p>" },
        { key: "books", title: "Books & Stationery Fee", amount: 2500, description: "<p>Books and stationery materials</p>" },
        { key: "smartClass", title: "Smart Class / Technology Fee", amount: 1000, description: "<p>Digital classrooms fee</p>" },

        // 3. Activity / Extracurricular Fees
        { key: "sports", title: "Sports / Gym / PT Fee", amount: 1000, description: "<p>Physical training and sports equipment</p>" },
        { key: "artMusic", title: "Art / Music / Dance Fee", amount: 1200, description: "<p>Extra-curricular programs</p>" },
        { key: "fieldTrip", title: "Field Trip / Excursion Fee", amount: 800, description: "<p>Charged for excursions</p>" },

        // 4. Transport & Boarding
        { key: "transport", title: "Transport / Bus Fee", amount: 6000, description: "<p>Route-based transport</p>" },
        { key: "hostel", title: "Hostel / Boarding Fee", amount: 15000, description: "<p>For boarding students</p>" },
        { key: "meal", title: "Meal / Canteen Fee", amount: 3000, description: "<p>Optional, monthly meals</p>" },

        // 5. Recurring / Miscellaneous
        { key: "lateFee", title: "Late Fee / Fine", amount: 50, description: "<p>Charged for delayed payment</p>" },
        { key: "annualTermly", title: "Annual / Termly Fee", amount: 0, description: "<p>Depending on lump sum payment</p>" },
        { key: "uniform", title: "Uniform Fee", amount: 2000, description: "<p>Optional / one-time fee</p>" },
        { key: "insurance", title: "Insurance / Health Fee", amount: 500, description: "<p>School insurance coverage</p>" },
        ],
      });
    }  
    res.status(200).json({ success: true, data: fs });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT update fee structure (admin)
router.put("/", async (req, res) => {
  try {
    // TODO: add auth middleware to protect this route
    const body = req.body;
    let fs = await FeeStructure.findOne();
    if (!fs) fs = new FeeStructure({});
    // accept notes and items from body
    fs.notes = body.notes || fs.notes;
    fs.items = body.items || fs.items;
    fs.academicYear = body.academicYear || fs.academicYear;
    fs.updatedAt = new Date();
    await fs.save();
    res.status(200).json({ success: true, data: fs, message: "Fee structure updated" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST create or update student (admin)
// router.post("/student", async (req, res) => {
//   try {
//     const s = await Student.findOneAndUpdate(
//       { admissionNo: req.body.admissionNo },
//       req.body,
//       { upsert: true, new: true }
//     );
//     res.status(200).json({ success: true, data: s, message: "Student saved" });
//   } catch (err) {
//     res.status(500).json({ success: false, error: err.message });
//   }
// });
// Create or update student fee overrides (admin)
router.post("/student", async (req, res) => {
  try {
    const { admissionNo, feeOverrides = {} } = req.body;
    const student = await Admission.findOne({ admissionNo });
    if (!student) {
      return res.status(404).json({ success: false, error: "Student not found" });
    }

    student.feeOverrides = feeOverrides;
    await student.save();

    res.json({ success: true, data: student, message: "Student fee overrides updated" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});


// GET student detail + fee summary
router.get("/student/:admissionNo", async (req, res) => {
  try {
    // const student = await Student.findOne({ admissionNo: req.params.admissionNo });
    const student = await Admission.findOne({ admissionNo: req.params.admissionNo });
    if (!student) return res.status(404).json({ success: false, error: "Student not found" });

    const fs = await FeeStructure.findOne();
    const items = fs?.items || [];
    // compute amounts with possible overrides
    const computed = {};
    let total = 0;
    items.forEach(it => {
      const override = student.feeOverrides && student.feeOverrides.get(it.key);
      const amt = typeof override === "number" ? override : it.amount;
      computed[it.key] = { title: it.title, amount: amt };
      total += amt;
    });

    // sum payments
    const payments = await FeeTransaction.find({ admissionNo: student.admissionNo }).sort({ createdAt: 1 });
    const paid = payments.reduce((s, t) => s + t.amount, 0);
    const remaining = Math.max(0, total - paid);

    res.json({
      success: true,
      data: {
        student,
        fee: { items: computed, total, paid, remaining },
        payments,
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});


// POST simulate payment (parent)
// body: { admissionNo, amount, method, breakdown? }
router.post("/pay", async (req, res) => {
  try {
    const { admissionNo, amount, method = "simulated", breakdown = {} } = req.body;
    // const student = await Student.findOne({ admissionNo });
    const student = await Admission.findOne({ admissionNo });
    if (!student) return res.status(404).json({ success: false, error: "Student not found" });

    // compute total at payment time
    const fs = await FeeStructure.findOne();
    const items = fs?.items || [];
    let total = 0;
    items.forEach(it => {
      const override = student.feeOverrides && student.feeOverrides.get(it.key);
      const amt = typeof override === "number" ? override : it.amount;
      total += amt;
    });

    // calculate paid so far
    const paidBefore = (await FeeTransaction.find({ admissionNo })).reduce((s, t) => s + t.amount, 0);
    const remainingBefore = Math.max(0, total - paidBefore);

    // create transaction
    const tx = await FeeTransaction.create({
      admissionNo,
      studentName: student.studentName,
      amount,
      paymentMethod: method,
      gatewayRef: "SIM-" + Date.now(),
      breakdown,
      totalFee: total,
      remainingAfter: Math.max(0, remainingBefore - amount),
    });

    res.json({ success: true, data: tx, message: "Payment recorded" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET all transactions (admin)
router.get("/transactions", async (req, res) => {
  try {
    const txs = await FeeTransaction.find().sort({ createdAt: -1 });
    res.json({ success: true, data: txs });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET all students (for admin fee management)
router.get("/admin/students", async (req, res) => {
  try {
    const students = await Admission.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: students });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});


export default router;



















































// real payment system

// // routes/fees.js
// import express from "express";
// import Razorpay from "razorpay";
// import crypto from "crypto";
// import FeeStructure from "../models/FeeStructure.js";
// import Admission from "../models/Admission.js";
// import FeeTransaction from "../models/FeeTransaction.js";

// const router = express.Router();

// // ✅ Initialize Razorpay instance
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// // ---------------------------------------------
// // GET Fee Structure (already present, keep same)
// // ---------------------------------------------
// router.get("/", async (req, res) => {
//   try {
//     let fs = await FeeStructure.findOne();
//     if (!fs) {
//       fs = await FeeStructure.create({
//         academicYear: "2025-26",
//         notes: "<p>Fee structure for 2025-26</p>",
//         items: [
//           { key: "tuition", title: "Tuition Fee", amount: 30000 },
//           { key: "development", title: "Development Fee", amount: 5000 },
//           { key: "transport", title: "Transport Fee", amount: 6000 },
//         ],
//       });
//     }
//     res.json({ success: true, data: fs });
//   } catch (err) {
//     res.status(500).json({ success: false, error: err.message });
//   }
// });

// // ---------------------------------------------
// // GET student + fee info (same as before)
// // ---------------------------------------------
// router.get("/student/:admissionNo", async (req, res) => {
//   try {
//     const student = await Admission.findOne({ admissionNo: req.params.admissionNo });
//     if (!student) return res.status(404).json({ success: false, error: "Student not found" });

//     const fs = await FeeStructure.findOne();
//     const items = fs?.items || [];
//     const computed = {};
//     let total = 0;

//     items.forEach(it => {
//       const amt = it.amount;
//       computed[it.key] = { title: it.title, amount: amt };
//       total += amt;
//     });

//     const payments = await FeeTransaction.find({ admissionNo: student.admissionNo }).sort({ createdAt: 1 });
//     const paid = payments.reduce((s, t) => s + t.amount, 0);
//     const remaining = Math.max(0, total - paid);

//     res.json({
//       success: true,
//       data: {
//         student,
//         fee: { items: computed, total, paid, remaining },
//         payments,
//       },
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, error: err.message });
//   }
// });

// // ---------------------------------------------
// // 🔹 STEP 1: Create Razorpay Order
// // ---------------------------------------------
// router.post("/create-order", async (req, res) => {
//   try {
//     const { amount } = req.body;

//     const options = {
//       amount: amount * 100, // convert to paisa
//       currency: "INR",
//       receipt: "receipt_" + Date.now(),
//     };

//     const order = await razorpay.orders.create(options);
//     res.json({ success: true, order });
//   } catch (err) {
//     console.error("Razorpay order error:", err);
//     res.status(500).json({ success: false, error: err.message });
//   }
// });

// // ---------------------------------------------
// // 🔹 STEP 2: Verify Razorpay Payment
// // ---------------------------------------------
// router.post("/verify", async (req, res) => {
//   try {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature, admissionNo, amount } = req.body;

//     const body = razorpay_order_id + "|" + razorpay_payment_id;
//     const expectedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(body.toString())
//       .digest("hex");

//     if (expectedSignature !== razorpay_signature) {
//       return res.status(400).json({ success: false, error: "Payment verification failed" });
//     }

//     // find student
//     const student = await Admission.findOne({ admissionNo });
//     if (!student) return res.status(404).json({ success: false, error: "Student not found" });

//     // record transaction
//     const tx = await FeeTransaction.create({
//       admissionNo,
//       studentName: student.studentName,
//       amount,
//       paymentMethod: "Razorpay",
//       gatewayRef: razorpay_payment_id,
//       totalFee: amount,
//       remainingAfter: 0,
//     });

//     res.json({ success: true, message: "Payment verified and recorded", data: tx });
//   } catch (err) {
//     console.error("Verify error:", err);
//     res.status(500).json({ success: false, error: err.message });
//   }
// });

// // ---------------------------------------------
// // GET all transactions (admin)
// // ---------------------------------------------
// router.get("/transactions", async (req, res) => {
//   try {
//     const txs = await FeeTransaction.find().sort({ createdAt: -1 });
//     res.json({ success: true, data: txs });
//   } catch (err) {
//     res.status(500).json({ success: false, error: err.message });
//   }
// });

// export default router;

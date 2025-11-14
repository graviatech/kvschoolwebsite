// backend/scripts/createAdmin.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    const user = await User.createUser("kvadmin", "Password123");
    console.log("✅ Admin created:", user.username);

    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  } catch (err) {
    console.error("❌ Error creating admin:", err.message);
  }
};

run();



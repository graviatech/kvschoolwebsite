// import jwt from "jsonwebtoken";
// import bcrypt from "bcryptjs";
// import User from "../models/User.js";

// export const login = async (req, res) => {
//   const { username, password } = req.body;
//   const user = await User.findOne({ username });
//   if (!user) return res.status(400).json({ error: "Invalid credentials" });

//   const match = await user.comparePassword(password);
//   if (!match) return res.status(400).json({ error: "Invalid credentials" });

//   const token = jwt.sign(
//     { id: user._id, username: user.username }, // ✅ must include id
//     process.env.JWT_SECRET,
//     { expiresIn: "1d" }
//   );
//   res.json({ token });
// };






import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("🟢 Login attempt:", username);

    const user = await User.findOne({ username });
    if (!user) {
      console.log("🔴 No user found");
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const match = await user.comparePassword(password);
    if (!match) {
      console.log("🔴 Password mismatch for user:", username);
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    console.log("✅ Login successful for:", username);
    res.json({ token });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

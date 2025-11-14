// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// dotenv.config();

// export const authenticate = (req, res, next) => {
//   const header = req.headers.authorization;
//   if (!header) return res.status(401).json({ error: "No auth header" });

//   const token = header.split(" ")[1];
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.adminId = decoded;
//     next();
//   } catch (err) {
//     res.status(401).json({ error: "Invalid or expired token" });
//   }
// };












import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const authenticate = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer "))
    return res.status(401).json({ error: "No auth header" });

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.adminId = decoded.id;   // ✅ only store the user ID
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};



// import express from "express";
// import { openDb } from "../sqlite.js";

// const router = express.Router();

// // Create table if not exists
// (async () => {
//   const db = await openDb();
//   await db.exec(`
//     CREATE TABLE IF NOT EXISTS users (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       name TEXT,
//       email TEXT
//     )
//   `);
// })();

// // GET all users
// router.get("/users", async (req, res) => {
//   const db = await openDb();
//   const users = await db.all("SELECT * FROM users");
//   res.json(users);
// });

// // POST new user
// router.post("/users", async (req, res) => {
//   const { name, email } = req.body;
//   const db = await openDb();
//   const result = await db.run("INSERT INTO users (name, email) VALUES (?, ?)", [name, email]);
//   res.json({ id: result.lastID, name, email });
// });

// export default router;


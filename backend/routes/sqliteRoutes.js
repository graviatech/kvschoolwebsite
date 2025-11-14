import express from "express";
import { openDb } from "../sqlite.js";

const router = express.Router();

// -------------------- CREATE TABLE --------------------
(async () => {
  const db = await openDb();
  await db.exec(`
    CREATE TABLE IF NOT EXISTS students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      age INTEGER,
      grade TEXT
    )
  `);
})();

// -------------------- GET ALL STUDENTS --------------------
router.get("/students", async (req, res) => {
  try {
    const db = await openDb();
    const students = await db.all("SELECT * FROM students");
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------- GET STUDENT BY ID --------------------
router.get("/students/:id", async (req, res) => {
  try {
    const db = await openDb();
    const student = await db.get("SELECT * FROM students WHERE id = ?", [req.params.id]);
    if (!student) return res.status(404).json({ error: "Student not found" });
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------- CREATE NEW STUDENT --------------------
router.post("/students", async (req, res) => {
  try {
    const { name, age, grade } = req.body;
    if (!name) return res.status(400).json({ error: "Name is required" });

    const db = await openDb();
    const result = await db.run(
      "INSERT INTO students (name, age, grade) VALUES (?, ?, ?)",
      [name, age, grade]
    );
    res.json({ id: result.lastID, name, age, grade });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------- UPDATE STUDENT --------------------
router.put("/students/:id", async (req, res) => {
  try {
    const { name, age, grade } = req.body;
    const db = await openDb();
    const result = await db.run(
      "UPDATE students SET name = ?, age = ?, grade = ? WHERE id = ?",
      [name, age, grade, req.params.id]
    );
    if (result.changes === 0) return res.status(404).json({ error: "Student not found" });
    res.json({ id: req.params.id, name, age, grade });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------- DELETE STUDENT --------------------
router.delete("/students/:id", async (req, res) => {
  try {
    const db = await openDb();
    const result = await db.run("DELETE FROM students WHERE id = ?", [req.params.id]);
    if (result.changes === 0) return res.status(404).json({ error: "Student not found" });
    res.json({ message: "Student deleted", id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;


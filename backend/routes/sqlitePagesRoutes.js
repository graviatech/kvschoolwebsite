import express from "express";
import { openDb } from "../sqlite.js";

const router = express.Router();

// -------------------- CREATE NEW PAGE --------------------
router.post("/pages", async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) return res.status(400).json({ error: "Title and content required" });

    const db = await openDb();
    await db.run("INSERT INTO pages (title, content) VALUES (?, ?)", [title, content]);

    res.json({ success: true, message: "Page saved!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------- GET ALL PAGES --------------------
router.get("/pages", async (req, res) => {
  try {
    const db = await openDb();
    const pages = await db.all("SELECT * FROM pages");
    res.json(pages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------- GET PAGE BY TITLE --------------------
router.get("/pages/:title", async (req, res) => {
  try {
    const db = await openDb();
    const page = await db.get("SELECT * FROM pages WHERE title = ?", [req.params.title]);
    if (!page) return res.status(404).json({ error: "Page not found" });
    res.json({ success: true, page });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------- UPDATE PAGE --------------------
router.put("/pages/:title", async (req, res) => {
  try {
    const { content } = req.body;
    const db = await openDb();
    const result = await db.run("UPDATE pages SET content = ? WHERE title = ?", [content, req.params.title]);
    if (result.changes === 0) return res.status(404).json({ error: "Page not found" });
    res.json({ success: true, message: "Page updated!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------- DELETE PAGE --------------------
router.delete("/pages/:title", async (req, res) => {
  try {
    const db = await openDb();
    const result = await db.run("DELETE FROM pages WHERE title = ?", [req.params.title]);
    if (result.changes === 0) return res.status(404).json({ error: "Page not found" });
    res.json({ success: true, message: "Page deleted!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;


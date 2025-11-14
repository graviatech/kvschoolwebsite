// sqlite.js
import sqlite3 from "sqlite3";
import { open } from "sqlite";

export async function openDb() {
  const db = await open({
    filename: "./sqlite_db/database.sqlite",
    driver: sqlite3.Database,
  });

  // Create students table if not exists
  await db.exec(`
    CREATE TABLE IF NOT EXISTS students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      age INTEGER,
      grade TEXT
    )
  `);

  return db;
}


// sqlite_db/database.js
import Database from "better-sqlite3";
import path from "path";

const dbPath = path.resolve("./sqlite_db/mydb.sqlite");
const db = new Database(dbPath);

// Example table
db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE
  )
`).run();

export default db;


import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import Database from "better-sqlite3";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("database.db");

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS blogs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT NOT NULL,
    image_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS materials (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    file_url TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/blogs", (req, res) => {
    const blogs = db.prepare("SELECT * FROM blogs ORDER BY created_at DESC").all();
    res.json(blogs);
  });

  app.post("/api/blogs", (req, res) => {
    const { title, content, category, image_url } = req.body;
    const info = db.prepare("INSERT INTO blogs (title, content, category, image_url) VALUES (?, ?, ?, ?)").run(title, content, category, image_url);
    res.json({ id: info.lastInsertRowid });
  });

  app.delete("/api/blogs/:id", (req, res) => {
    db.prepare("DELETE FROM blogs WHERE id = ?").run(req.params.id);
    res.sendStatus(200);
  });

  app.get("/api/materials", (req, res) => {
    const materials = db.prepare("SELECT * FROM materials ORDER BY created_at DESC").all();
    res.json(materials);
  });

  app.post("/api/materials", (req, res) => {
    const { title, category, file_url } = req.body;
    const info = db.prepare("INSERT INTO materials (title, category, file_url) VALUES (?, ?, ?)").run(title, category, file_url);
    res.json({ id: info.lastInsertRowid });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

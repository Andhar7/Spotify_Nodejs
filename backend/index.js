import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { createServer } from "http";
import fileUpload from "express-fileupload";
import cron from "node-cron";
import fs from "fs";

import { connectDB } from "./db/connectDB.js";
import { initializeSocket } from "./lib/socket.js";

import authRoutes from "./routes/auth.route.js";
import songRoutes from "./routes/song.route.js";
import albumRoutes from "./routes/album.route.js";
import adminRoutes from "./routes/admin.route.js";
import userRoutes from "./routes/user.route.js";
import statRoutes from "./routes/stat.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// Create HTTP server for Socket.io
const httpServer = createServer(app);

// Initialize Socket.io
initializeSocket(httpServer);

// CORS middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// Body parsing middleware
app.use(express.json()); // allows us to parse incoming requests:req.body
app.use(cookieParser()); // allows us to parse incoming cookies

// File upload middleware
const tempDir = path.join(__dirname, "backend", "tmp");
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: tempDir,
    createParentPath: true,
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB max file size
    },
  })
);

// Serve static files from uploads directory
app.use("/uploads", express.static(path.join(__dirname, "backend", "uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/stats", statRoutes);

// Production: serve frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  if (process.env.NODE_ENV === "production") {
    res.status(500).json({ success: false, message: "Internal server error" });
  } else {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Cron job to clean up temp files every hour
cron.schedule("0 * * * *", () => {
  if (fs.existsSync(tempDir)) {
    fs.readdir(tempDir, (err, files) => {
      if (err) {
        console.log("Error reading temp directory:", err);
        return;
      }
      for (const file of files) {
        fs.unlink(path.join(tempDir, file), (unlinkErr) => {
          if (unlinkErr) {
            console.log("Error deleting temp file:", unlinkErr);
          }
        });
      }
    });
  }
});

// Start server
httpServer.listen(PORT, () => {
  connectDB();
  console.log("Server is running on port:", PORT);
});


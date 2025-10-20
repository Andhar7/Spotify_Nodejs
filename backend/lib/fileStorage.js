import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, "../uploads");
const audioDir = path.join(uploadsDir, "audio");
const imageDir = path.join(uploadsDir, "images");

// Ensure directories exist
[uploadsDir, audioDir, imageDir].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

/**
 * Save uploaded file to local storage
 * @param {Object} file - File object from express-fileupload
 * @param {string} type - 'audio' or 'image'
 * @returns {string} - Public URL path to the file
 */
export const saveFile = async (file, type = "image") => {
  try {
    // Generate unique filename
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const extension = path.extname(file.name);
    const filename = `${timestamp}-${randomString}${extension}`;

    // Determine save directory
    const saveDir = type === "audio" ? audioDir : imageDir;
    const filePath = path.join(saveDir, filename);

    // Move file to destination
    await file.mv(filePath);

    // Return public URL path
    return `/uploads/${type === "audio" ? "audio" : "images"}/${filename}`;
  } catch (error) {
    console.error("Error saving file:", error);
    throw new Error("Error saving file to local storage");
  }
};

/**
 * Delete file from local storage
 * @param {string} fileUrl - Public URL path to the file
 */
export const deleteFile = async (fileUrl) => {
  try {
    if (!fileUrl || !fileUrl.startsWith("/uploads/")) {
      return; // Not a local file
    }

    const filePath = path.join(__dirname, "..", fileUrl);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (error) {
    console.error("Error deleting file:", error);
    // Don't throw error, just log it
  }
};

/**
 * Get absolute path for a public URL
 * @param {string} fileUrl - Public URL path
 * @returns {string} - Absolute file path
 */
export const getFilePath = (fileUrl) => {
  return path.join(__dirname, "..", fileUrl);
};

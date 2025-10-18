import pkg from "pg";
const { Pool } = pkg;
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
  max: 20, // maximum number of clients in the pool
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Test database connection
export const connectDB = async () => {
  try {
    const client = await pool.connect();
    console.log(`PostgreSQL Connected: ${client.host || "localhost"}`);
    client.release();

    // Initialize database schema if needed
    await initializeSchema();
  } catch (error) {
    console.log("Error connecting to PostgreSQL: ", error.message);
    process.exit(1);
  }
};

// Initialize database schema
const initializeSchema = async () => {
  try {
    const schemaPath = path.join(__dirname, "schema.sql");
    const schema = fs.readFileSync(schemaPath, "utf8");
    await pool.query(schema);
    console.log("Database schema initialized successfully");
  } catch (error) {
    console.log("Error initializing schema: ", error.message);
    // Don't exit here - schema might already exist
  }
};

// Export the query function for executing SQL queries
export const query = async (text, params) => {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    if (process.env.NODE_ENV === "development") {
      console.log("Executed query", { text, duration, rows: res.rowCount });
    }
    return res;
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
};

// Export the pool for transactions or advanced usage
export { pool };

// Graceful shutdown
process.on("SIGTERM", () => {
  pool.end(() => {
    console.log("PostgreSQL pool has ended");
  });
});

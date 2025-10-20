import { query } from "../db/connectDB.js";

export const Message = {
  // Create a new message
  async create({ senderId, receiverId, content }) {
    const sql = `
      INSERT INTO messages (sender_id, receiver_id, content)
      VALUES ($1, $2, $3)
      RETURNING id, sender_id as "senderId", receiver_id as "receiverId", content,
                created_at as "createdAt", updated_at as "updatedAt"
    `;
    const result = await query(sql, [senderId, receiverId, content]);
    return result.rows[0];
  },

  // Find all messages between two users (bidirectional)
  async findBetweenUsers(userId1, userId2) {
    const sql = `
      SELECT id, sender_id as "senderId", receiver_id as "receiverId", content,
             created_at as "createdAt", updated_at as "updatedAt"
      FROM messages
      WHERE (sender_id = $1 AND receiver_id = $2)
         OR (sender_id = $2 AND receiver_id = $1)
      ORDER BY created_at ASC
    `;
    const result = await query(sql, [userId1, userId2]);
    return result.rows;
  }
};

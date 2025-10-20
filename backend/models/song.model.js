import { query } from "../db/connectDB.js";

export const Song = {
  // Create a new song
  async create({ title, artist, imageUrl, audioUrl, duration, albumId = null }) {
    const sql = `
      INSERT INTO songs (title, artist, image_url, audio_url, duration, album_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id, title, artist, image_url as "imageUrl", audio_url as "audioUrl",
                duration, album_id as "albumId", created_at as "createdAt", updated_at as "updatedAt"
    `;
    const result = await query(sql, [title, artist, imageUrl, audioUrl, duration, albumId]);
    return result.rows[0];
  },

  // Find all songs
  async findAll() {
    const sql = `
      SELECT id, title, artist, image_url as "imageUrl", audio_url as "audioUrl",
             duration, album_id as "albumId", created_at as "createdAt", updated_at as "updatedAt"
      FROM songs
      ORDER BY created_at DESC
    `;
    const result = await query(sql);
    return result.rows;
  },

  // Find song by ID
  async findById(id) {
    const sql = `
      SELECT id, title, artist, image_url as "imageUrl", audio_url as "audioUrl",
             duration, album_id as "albumId", created_at as "createdAt", updated_at as "updatedAt"
      FROM songs
      WHERE id = $1
    `;
    const result = await query(sql, [id]);
    return result.rows[0] || null;
  },

  // Delete song
  async delete(id) {
    const sql = `DELETE FROM songs WHERE id = $1`;
    await query(sql, [id]);
  },

  // Get random songs (for featured, made-for-you, trending)
  async getRandom(limit = 6) {
    const sql = `
      SELECT id, title, artist, image_url as "imageUrl", audio_url as "audioUrl"
      FROM songs
      ORDER BY RANDOM()
      LIMIT $1
    `;
    const result = await query(sql, [limit]);
    return result.rows;
  },

  // Find songs by album ID
  async findByAlbumId(albumId) {
    const sql = `
      SELECT id, title, artist, image_url as "imageUrl", audio_url as "audioUrl",
             duration, album_id as "albumId", created_at as "createdAt", updated_at as "updatedAt"
      FROM songs
      WHERE album_id = $1
      ORDER BY created_at ASC
    `;
    const result = await query(sql, [albumId]);
    return result.rows;
  },

  // Delete songs by album ID
  async deleteByAlbumId(albumId) {
    const sql = `DELETE FROM songs WHERE album_id = $1`;
    await query(sql, [albumId]);
  }
};

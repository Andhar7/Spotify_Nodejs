import { Album } from "../models/album.model.js";
import { User } from "../models/user.model.js";
import { query } from "../db/connectDB.js";

// Get platform statistics
export const getStats = async (req, res, next) => {
  try {
    // Run all queries in parallel
    const [songsResult, albumsResult, usersResult, artistsResult] = await Promise.all([
      // Total songs
      query("SELECT COUNT(*) as count FROM songs"),

      // Total albums
      Album.count(),

      // Total users
      User.count(),

      // Count unique artists (from both songs and albums)
      query(`
        SELECT COUNT(DISTINCT artist) as count
        FROM (
          SELECT artist FROM songs
          UNION
          SELECT artist FROM albums
        ) AS all_artists
      `),
    ]);

    const stats = {
      totalSongs: parseInt(songsResult.rows[0].count),
      totalAlbums: albumsResult,
      totalUsers: usersResult,
      totalArtists: parseInt(artistsResult.rows[0].count),
    };

    res.status(200).json({ success: true, stats });
  } catch (error) {
    console.error("Error in getStats:", error);
    next(error);
  }
};

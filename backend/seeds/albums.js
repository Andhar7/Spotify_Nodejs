import dotenv from "dotenv";
import { connectDB, query } from "../db/connectDB.js";

dotenv.config();

const songs = [
  {
    title: "Stay With Me",
    artist: "Sarah Mitchell",
    imageUrl: "/uploads/images/1.jpg",
    audioUrl: "/uploads/audio/1.mp3",
    duration: 46,
  },
  {
    title: "Midnight Drive",
    artist: "The Wanderers",
    imageUrl: "/uploads/images/2.jpg",
    audioUrl: "/uploads/audio/2.mp3",
    duration: 41,
  },
  {
    title: "Lost in Tokyo",
    artist: "Electric Dreams",
    imageUrl: "/uploads/images/3.jpg",
    audioUrl: "/uploads/audio/3.mp3",
    duration: 24,
  },
  {
    title: "Summer Daze",
    artist: "Coastal Kids",
    imageUrl: "/uploads/images/4.jpg",
    audioUrl: "/uploads/audio/4.mp3",
    duration: 24,
  },
  {
    title: "Neon Lights",
    artist: "Night Runners",
    imageUrl: "/uploads/images/5.jpg",
    audioUrl: "/uploads/audio/5.mp3",
    duration: 36,
  },
  {
    title: "Mountain High",
    artist: "The Wild Ones",
    imageUrl: "/uploads/images/6.jpg",
    audioUrl: "/uploads/audio/6.mp3",
    duration: 40,
  },
  {
    title: "City Rain",
    artist: "Urban Echo",
    imageUrl: "/uploads/images/7.jpg",
    audioUrl: "/uploads/audio/7.mp3",
    duration: 39,
  },
  {
    title: "Desert Wind",
    artist: "Sahara Sons",
    imageUrl: "/uploads/images/8.jpg",
    audioUrl: "/uploads/audio/8.mp3",
    duration: 28,
  },
  {
    title: "Ocean Waves",
    artist: "Coastal Drift",
    imageUrl: "/uploads/images/9.jpg",
    audioUrl: "/uploads/audio/9.mp3",
    duration: 28,
  },
  {
    title: "Starlight",
    artist: "Luna Bay",
    imageUrl: "/uploads/images/10.jpg",
    audioUrl: "/uploads/audio/10.mp3",
    duration: 30,
  },
  {
    title: "Winter Dreams",
    artist: "Arctic Pulse",
    imageUrl: "/uploads/images/11.jpg",
    audioUrl: "/uploads/audio/11.mp3",
    duration: 29,
  },
  {
    title: "Purple Sunset",
    artist: "Dream Valley",
    imageUrl: "/uploads/images/12.jpg",
    audioUrl: "/uploads/audio/12.mp3",
    duration: 17,
  },
  {
    title: "Neon Dreams",
    artist: "Cyber Pulse",
    imageUrl: "/uploads/images/13.jpg",
    audioUrl: "/uploads/audio/13.mp3",
    duration: 39,
  },
  {
    title: "Moonlight Dance",
    artist: "Silver Shadows",
    imageUrl: "/uploads/images/14.jpg",
    audioUrl: "/uploads/audio/14.mp3",
    duration: 27,
  },
];

const albums = [
  {
    title: "Urban Nights",
    artist: "Various Artists",
    imageUrl: "/uploads/images/album1.jpg",
    releaseYear: 2024,
    songs: [0, 1, 2, 3], // indices in songs array
  },
  {
    title: "Coastal Dreaming",
    artist: "Various Artists",
    imageUrl: "/uploads/images/album2.jpg",
    releaseYear: 2024,
    songs: [4, 5, 6, 7],
  },
  {
    title: "Midnight Sessions",
    artist: "Various Artists",
    imageUrl: "/uploads/images/album3.jpg",
    releaseYear: 2024,
    songs: [8, 9, 10],
  },
  {
    title: "Eastern Dreams",
    artist: "Various Artists",
    imageUrl: "/uploads/images/album4.jpg",
    releaseYear: 2024,
    songs: [11, 12, 13],
  },
];

const seedAlbums = async () => {
  try {
    await connectDB();

    // Delete all existing albums and songs
    await query("DELETE FROM songs");
    await query("DELETE FROM albums");
    console.log("Deleted all existing albums and songs");

    // Insert songs first
    const insertedSongs = [];
    for (const song of songs) {
      const result = await query(
        `INSERT INTO songs (title, artist, image_url, audio_url, duration)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING id`,
        [song.title, song.artist, song.imageUrl, song.audioUrl, song.duration]
      );
      insertedSongs.push(result.rows[0].id);
    }
    console.log(`Inserted ${insertedSongs.length} songs`);

    // Insert albums and update songs with album_id
    for (const album of albums) {
      // Create album
      const albumResult = await query(
        `INSERT INTO albums (title, artist, image_url, release_year)
         VALUES ($1, $2, $3, $4)
         RETURNING id`,
        [album.title, album.artist, album.imageUrl, album.releaseYear]
      );
      const albumId = albumResult.rows[0].id;

      // Update songs to reference this album
      for (const songIndex of album.songs) {
        const songId = insertedSongs[songIndex];
        await query(`UPDATE songs SET album_id = $1 WHERE id = $2`, [albumId, songId]);
      }

      console.log(`Created album: ${album.title} with ${album.songs.length} songs`);
    }

    console.log(`Successfully seeded ${albums.length} albums with relationships`);
    process.exit(0);
  } catch (error) {
    console.error("Error seeding albums:", error);
    process.exit(1);
  }
};

seedAlbums();

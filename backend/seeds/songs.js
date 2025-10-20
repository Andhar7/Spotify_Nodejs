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
  {
    title: "Urban Jungle",
    artist: "City Lights",
    imageUrl: "/uploads/images/15.jpg",
    audioUrl: "/uploads/audio/15.mp3",
    duration: 36,
  },
  {
    title: "Crystal Rain",
    artist: "Echo Valley",
    imageUrl: "/uploads/images/16.jpg",
    audioUrl: "/uploads/audio/16.mp3",
    duration: 39,
  },
  {
    title: "Neon Tokyo",
    artist: "Future Pulse",
    imageUrl: "/uploads/images/17.jpg",
    audioUrl: "/uploads/audio/17.mp3",
    duration: 39,
  },
  {
    title: "Midnight Blues",
    artist: "Jazz Cats",
    imageUrl: "/uploads/images/18.jpg",
    audioUrl: "/uploads/audio/18.mp3",
    duration: 29,
  },
];

const seedSongs = async () => {
  try {
    await connectDB();

    // Delete all existing songs
    await query("DELETE FROM songs");
    console.log("Deleted all existing songs");

    // Insert songs
    for (const song of songs) {
      await query(
        `INSERT INTO songs (title, artist, image_url, audio_url, duration)
         VALUES ($1, $2, $3, $4, $5)`,
        [song.title, song.artist, song.imageUrl, song.audioUrl, song.duration]
      );
    }

    console.log(`Successfully seeded ${songs.length} songs`);
    process.exit(0);
  } catch (error) {
    console.error("Error seeding songs:", error);
    process.exit(1);
  }
};

seedSongs();

import { Song } from "../models/song.model.js";

// Get all songs (admin only)
export const getAllSongs = async (req, res, next) => {
  try {
    const songs = await Song.findAll();
    res.status(200).json({ success: true, songs });
  } catch (error) {
    console.error("Error in getAllSongs:", error);
    next(error);
  }
};

// Get 6 random featured songs
export const getFeaturedSongs = async (req, res, next) => {
  try {
    const songs = await Song.getRandom(6);
    res.status(200).json({ success: true, songs });
  } catch (error) {
    console.error("Error in getFeaturedSongs:", error);
    next(error);
  }
};

// Get 4 random "Made For You" songs
export const getMadeForYouSongs = async (req, res, next) => {
  try {
    const songs = await Song.getRandom(4);
    res.status(200).json({ success: true, songs });
  } catch (error) {
    console.error("Error in getMadeForYouSongs:", error);
    next(error);
  }
};

// Get 4 random trending songs
export const getTrendingSongs = async (req, res, next) => {
  try {
    const songs = await Song.getRandom(4);
    res.status(200).json({ success: true, songs });
  } catch (error) {
    console.error("Error in getTrendingSongs:", error);
    next(error);
  }
};

import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";
import { saveFile, deleteFile } from "../lib/fileStorage.js";

// Check admin status
export const checkAdmin = async (req, res) => {
  res.status(200).json({ success: true, admin: true });
};

// Create a new song
export const createSong = async (req, res, next) => {
  try {
    if (!req.files || !req.files.audioFile || !req.files.imageFile) {
      return res.status(400).json({
        success: false,
        message: "Please upload both audio and image files",
      });
    }

    const { title, artist, albumId, duration } = req.body;
    const audioFile = req.files.audioFile;
    const imageFile = req.files.imageFile;

    // Save files to local storage
    const audioUrl = await saveFile(audioFile, "audio");
    const imageUrl = await saveFile(imageFile, "image");

    // Create song in database
    const song = await Song.create({
      title,
      artist,
      audioUrl,
      imageUrl,
      duration: parseInt(duration),
      albumId: albumId || null,
    });

    res.status(201).json({ success: true, song });
  } catch (error) {
    console.error("Error in createSong:", error);
    next(error);
  }
};

// Delete a song
export const deleteSong = async (req, res, next) => {
  try {
    const { id } = req.params;

    const song = await Song.findById(id);

    if (!song) {
      return res.status(404).json({
        success: false,
        message: "Song not found",
      });
    }

    // Delete files from local storage
    if (song.audio_url) await deleteFile(song.audio_url);
    if (song.image_url) await deleteFile(song.image_url);

    // Delete song from database
    await Song.delete(id);

    res.status(200).json({
      success: true,
      message: "Song deleted successfully",
    });
  } catch (error) {
    console.error("Error in deleteSong:", error);
    next(error);
  }
};

// Create a new album
export const createAlbum = async (req, res, next) => {
  try {
    if (!req.files || !req.files.imageFile) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image file",
      });
    }

    const { title, artist, releaseYear } = req.body;
    const imageFile = req.files.imageFile;

    // Save image to local storage
    const imageUrl = await saveFile(imageFile, "image");

    // Create album in database
    const album = await Album.create({
      title,
      artist,
      imageUrl,
      releaseYear: parseInt(releaseYear),
    });

    res.status(201).json({ success: true, album });
  } catch (error) {
    console.error("Error in createAlbum:", error);
    next(error);
  }
};

// Delete an album
export const deleteAlbum = async (req, res, next) => {
  try {
    const { id } = req.params;

    const album = await Album.findById(id);

    if (!album) {
      return res.status(404).json({
        success: false,
        message: "Album not found",
      });
    }

    // Get all songs in the album to delete their files
    const songs = await Song.findByAlbumId(id);
    for (const song of songs) {
      if (song.audio_url) await deleteFile(song.audio_url);
      if (song.image_url) await deleteFile(song.image_url);
    }

    // Delete album image
    if (album.image_url) await deleteFile(album.image_url);

    // Delete all songs in the album from database
    await Song.deleteByAlbumId(id);

    // Delete the album from database
    await Album.delete(id);

    res.status(200).json({
      success: true,
      message: "Album deleted successfully",
    });
  } catch (error) {
    console.error("Error in deleteAlbum:", error);
    next(error);
  }
};

import { Album } from "../models/album.model.js";

// Get all albums
export const getAllAlbums = async (req, res, next) => {
  try {
    const albums = await Album.findAll();
    res.status(200).json({ success: true, albums });
  } catch (error) {
    console.error("Error in getAllAlbums:", error);
    next(error);
  }
};

// Get album by ID with songs populated
export const getAlbumById = async (req, res, next) => {
  try {
    const { albumId } = req.params;

    const album = await Album.findByIdWithSongs(albumId);

    if (!album) {
      return res.status(404).json({
        success: false,
        message: "Album not found",
      });
    }

    res.status(200).json({ success: true, album });
  } catch (error) {
    console.error("Error in getAlbumById:", error);
    next(error);
  }
};

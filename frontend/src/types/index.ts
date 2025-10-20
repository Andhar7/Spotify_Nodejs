export interface Song {
  id: string;
  title: string;
  artist: string;
  imageUrl: string;
  audioUrl: string;
  duration: number;
  albumId?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  imageUrl: string;
  releaseYear: number;
  songs?: Song[];
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  isVerified: boolean;
  isAdmin?: boolean;
  lastLogin?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Stats {
  totalSongs: number;
  totalAlbums: number;
  totalUsers: number;
  totalArtists: number;
}

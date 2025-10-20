import { create } from "zustand";
import { Song } from "@/types";

interface PlayerStore {
  currentSong: Song | null;
  isPlaying: boolean;
  queue: Song[];
  currentIndex: number;

  initializeQueue: (songs: Song[]) => void;
  playAlbum: (songs: Song[], startIndex?: number) => void;
  setCurrentSong: (song: Song | null) => void;
  togglePlay: () => void;
  playNext: () => void;
  playPrevious: () => void;
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  currentSong: null,
  isPlaying: false,
  queue: [],
  currentIndex: -1,

  initializeQueue: (songs: Song[]) => {
    set({
      queue: songs,
      currentSong: get().currentSong || songs[0],
      currentIndex: get().currentIndex === -1 ? 0 : get().currentIndex,
    });
  },

  playAlbum: (songs: Song[], startIndex = 0) => {
    if (songs.length === 0) return;

    const song = songs[startIndex];

    set({
      queue: songs,
      currentSong: song,
      currentIndex: startIndex,
      isPlaying: true,
    });
  },

  setCurrentSong: (song: Song | null) => {
    if (!song) return;

    const songIndex = get().queue.findIndex((s) => s.id === song.id);
    set({
      currentSong: song,
      isPlaying: true,
      currentIndex: songIndex !== -1 ? songIndex : get().currentIndex,
    });
  },

  togglePlay: () => {
    set({ isPlaying: !get().isPlaying });
  },

  playNext: () => {
    const { currentIndex, queue } = get();
    const nextIndex = currentIndex + 1;

    if (nextIndex < queue.length) {
      set({
        currentIndex: nextIndex,
        currentSong: queue[nextIndex],
        isPlaying: true,
      });
    } else {
      // Loop back to the beginning
      set({ currentIndex: 0, currentSong: queue[0], isPlaying: true });
    }
  },

  playPrevious: () => {
    const { currentIndex, queue } = get();
    const prevIndex = currentIndex - 1;

    if (prevIndex >= 0) {
      set({
        currentIndex: prevIndex,
        currentSong: queue[prevIndex],
        isPlaying: true,
      });
    } else {
      // Loop to the end
      set({
        currentIndex: queue.length - 1,
        currentSong: queue[queue.length - 1],
        isPlaying: true,
      });
    }
  },
}));

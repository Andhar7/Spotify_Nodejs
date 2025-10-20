import { useEffect, useRef } from "react";
import { usePlayerStore } from "@/store/usePlayerStore";
import { useChatStore } from "@/store/useChatStore";

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const prevSongRef = useRef<string | null>(null);

  const { currentSong, isPlaying, playNext } = usePlayerStore();
  const { socket } = useChatStore();

  // Handle play/pause
  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying]);

  // Handle song change
  useEffect(() => {
    if (!currentSong) return;

    const audio = audioRef.current;
    if (!audio) return;

    const isSongChange = prevSongRef.current !== currentSong.audioUrl;
    if (isSongChange) {
      audio.src = currentSong.audioUrl;
      audio.currentTime = 0;
      prevSongRef.current = currentSong.audioUrl;

      if (isPlaying) {
        audio.play();
      }
    }
  }, [currentSong, isPlaying]);

  // Emit activity updates via Socket.io
  useEffect(() => {
    if (!socket || !currentSong) return;

    if (isPlaying) {
      const activity = `Playing ${currentSong.title} by ${currentSong.artist}`;
      socket.emit("update_activity", { activity });
    } else {
      socket.emit("update_activity", { activity: "Idle" });
    }
  }, [isPlaying, currentSong, socket]);

  // Handle song end - play next
  const handleEnded = () => {
    playNext();
  };

  return (
    <audio
      ref={audioRef}
      onEnded={handleEnded}
      className="hidden"
    />
  );
};

export default AudioPlayer;

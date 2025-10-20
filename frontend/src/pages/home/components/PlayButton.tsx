import { Button } from "@/components/ui/button";
import { usePlayerStore } from "@/store/usePlayerStore";
import { Song } from "@/types";
import { Pause, Play } from "lucide-react";

interface PlayButtonProps {
  song: Song;
}

const PlayButton = ({ song }: PlayButtonProps) => {
  const { currentSong, isPlaying, setCurrentSong, togglePlay } = usePlayerStore();

  const isCurrentSong = currentSong?.id === song.id;

  const handlePlay = () => {
    if (isCurrentSong) {
      togglePlay();
    } else {
      setCurrentSong(song);
    }
  };

  return (
    <Button
      size='icon'
      onClick={handlePlay}
      className={`
        absolute bottom-3 right-2 bg-emerald-500 hover:bg-emerald-400 hover:scale-110
        transition-all opacity-0 translate-y-2 group-hover:translate-y-0 group-hover:opacity-100
        ${isCurrentSong && isPlaying ? "opacity-100 translate-y-0" : ""}
      `}
    >
      {isCurrentSong && isPlaying ? (
        <Pause className='h-5 w-5 text-black' />
      ) : (
        <Play className='h-5 w-5 text-black' />
      )}
    </Button>
  );
};

export default PlayButton;

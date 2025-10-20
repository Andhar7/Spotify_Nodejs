import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { usePlayerStore } from "@/store/usePlayerStore";
import { Pause, Play, SkipBack, SkipForward, Volume2 } from "lucide-react";

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

const PlaybackControls = () => {
  const { currentSong, isPlaying, togglePlay, playNext, playPrevious } = usePlayerStore();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(75);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Get audio element reference
  useEffect(() => {
    const audio = document.querySelector("audio");
    if (audio) {
      audioRef.current = audio;

      const updateTime = () => setCurrentTime(audio.currentTime);
      const updateDuration = () => setDuration(audio.duration);

      audio.addEventListener("timeupdate", updateTime);
      audio.addEventListener("loadedmetadata", updateDuration);

      return () => {
        audio.removeEventListener("timeupdate", updateTime);
        audio.removeEventListener("loadedmetadata", updateDuration);
      };
    }
  }, [currentSong]);

  // Handle volume change
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  if (!currentSong) return null;

  return (
    <div className='h-20 border-t border-zinc-800 bg-zinc-900 px-4'>
      <div className='flex h-full items-center justify-between'>
        {/* Song Info */}
        <div className='flex items-center gap-4 min-w-[180px] w-[30%]'>
          {currentSong.imageUrl && (
            <img
              src={currentSong.imageUrl}
              alt={currentSong.title}
              className='h-14 w-14 rounded-md object-cover'
            />
          )}
          <div className='flex-1 min-w-0'>
            <div className='font-medium truncate text-white'>{currentSong.title}</div>
            <div className='text-sm text-zinc-400 truncate'>{currentSong.artist}</div>
          </div>
        </div>

        {/* Player Controls */}
        <div className='flex flex-col items-center gap-2 flex-1 max-w-full md:max-w-[45%]'>
          <div className='flex items-center gap-4 md:gap-6'>
            <Button
              size='icon'
              variant='ghost'
              className='text-zinc-400 hover:text-white'
              onClick={playPrevious}
            >
              <SkipBack className='h-5 w-5' />
            </Button>

            <Button
              size='icon'
              className='bg-white text-black hover:bg-white/90 h-10 w-10'
              onClick={togglePlay}
            >
              {isPlaying ? (
                <Pause className='h-5 w-5' />
              ) : (
                <Play className='h-5 w-5 ml-0.5' />
              )}
            </Button>

            <Button
              size='icon'
              variant='ghost'
              className='text-zinc-400 hover:text-white'
              onClick={playNext}
            >
              <SkipForward className='h-5 w-5' />
            </Button>
          </div>

          {/* Progress Bar */}
          <div className='hidden md:flex items-center gap-2 w-full'>
            <div className='text-xs text-zinc-400'>{formatTime(currentTime)}</div>
            <Slider
              value={[currentTime]}
              max={duration || 100}
              step={1}
              className='w-full'
              onValueChange={handleSeek}
            />
            <div className='text-xs text-zinc-400'>{formatTime(duration)}</div>
          </div>
        </div>

        {/* Volume Control */}
        <div className='hidden md:flex items-center gap-2 min-w-[180px] w-[30%] justify-end'>
          <Volume2 className='h-5 w-5 text-zinc-400' />
          <Slider
            value={[volume]}
            max={100}
            step={1}
            className='w-24'
            onValueChange={(value) => setVolume(value[0])}
          />
        </div>
      </div>
    </div>
  );
};

export default PlaybackControls;

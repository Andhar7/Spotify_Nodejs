import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMusicStore } from "@/store/useMusicStore";
import { usePlayerStore } from "@/store/usePlayerStore";
import { Button } from "@/components/ui/button";
import { Clock, Pause, Play } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const formatDuration = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

const AlbumPage = () => {
  const { albumId } = useParams();
  const { currentAlbum, fetchAlbumById, isLoading } = useMusicStore();
  const { currentSong, isPlaying, playAlbum, togglePlay } = usePlayerStore();

  useEffect(() => {
    if (albumId) fetchAlbumById(albumId);
  }, [albumId, fetchAlbumById]);

  if (isLoading) {
    return (
      <div className='h-full flex items-center justify-center'>
        <div className='text-zinc-400'>Loading...</div>
      </div>
    );
  }

  if (!currentAlbum) {
    return (
      <div className='h-full flex items-center justify-center'>
        <div className='text-zinc-400'>Album not found</div>
      </div>
    );
  }

  const handlePlayAlbum = () => {
    if (!currentAlbum.songs || currentAlbum.songs.length === 0) return;

    const isCurrentAlbumPlaying = currentSong && currentAlbum.songs.some((song) => song.id === currentSong.id);

    if (isCurrentAlbumPlaying) {
      togglePlay();
    } else {
      playAlbum(currentAlbum.songs, 0);
    }
  };

  const handlePlaySong = (index: number) => {
    if (!currentAlbum.songs) return;
    playAlbum(currentAlbum.songs, index);
  };

  const isCurrentAlbumPlaying = currentSong && currentAlbum.songs?.some((song) => song.id === currentSong.id);

  return (
    <ScrollArea className='h-full'>
      <div className='relative min-h-full bg-gradient-to-b from-zinc-800 via-zinc-900 to-black'>
        {/* Album Header */}
        <div className='flex flex-col md:flex-row gap-6 p-8'>
          <img
            src={currentAlbum.imageUrl}
            alt={currentAlbum.title}
            className='w-48 h-48 md:w-64 md:h-64 shadow-xl rounded'
          />
          <div className='flex flex-col justify-end'>
            <p className='text-sm uppercase font-bold text-zinc-400 mb-2'>Album</p>
            <h1 className='text-4xl md:text-6xl font-bold text-white mb-4'>{currentAlbum.title}</h1>
            <div className='flex items-center gap-2 text-sm text-zinc-400'>
              <span className='font-medium text-white'>{currentAlbum.artist}</span>
              <span>•</span>
              <span>{currentAlbum.songs?.length || 0} songs</span>
              <span>•</span>
              <span>{currentAlbum.releaseYear}</span>
            </div>
          </div>
        </div>

        {/* Play Button */}
        <div className='px-8 pb-4'>
          <Button
            onClick={handlePlayAlbum}
            size='lg'
            className='bg-emerald-500 hover:bg-emerald-400 text-black rounded-full w-14 h-14'
          >
            {isCurrentAlbumPlaying && isPlaying ? (
              <Pause className='h-6 w-6' />
            ) : (
              <Play className='h-6 w-6 ml-1' />
            )}
          </Button>
        </div>

        {/* Songs Table */}
        <div className='px-8 pb-8'>
          <div className='grid grid-cols-[16px_4fr_2fr_1fr] gap-4 mb-2 px-4 text-sm text-zinc-400 border-b border-zinc-800 pb-2'>
            <div>#</div>
            <div>Title</div>
            <div>Artist</div>
            <div>
              <Clock className='h-4 w-4' />
            </div>
          </div>

          <div className='space-y-1'>
            {currentAlbum.songs?.map((song, index) => {
              const isCurrentSong = currentSong?.id === song.id;

              return (
                <div
                  key={song.id}
                  onClick={() => handlePlaySong(index)}
                  className={`
                    grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-4 py-3 rounded-md
                    hover:bg-zinc-800/50 transition-colors cursor-pointer group
                    ${isCurrentSong ? "bg-zinc-800/50" : ""}
                  `}
                >
                  <div className='flex items-center'>
                    {isCurrentSong && isPlaying ? (
                      <div className='text-emerald-500'>♫</div>
                    ) : (
                      <span className='text-zinc-400 group-hover:hidden'>{index + 1}</span>
                    )}
                    <Play className='h-4 w-4 hidden group-hover:block' />
                  </div>
                  <div className='flex items-center'>
                    <span className={`font-medium ${isCurrentSong ? "text-emerald-500" : "text-white"}`}>
                      {song.title}
                    </span>
                  </div>
                  <div className='flex items-center text-zinc-400'>{song.artist}</div>
                  <div className='flex items-center text-zinc-400'>{formatDuration(song.duration)}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};

export default AlbumPage;

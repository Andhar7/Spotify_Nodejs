import { Song } from "@/types";
import { usePlayerStore } from "@/store/usePlayerStore";
import PlayButton from "./PlayButton";

interface SectionGridProps {
  songs: Song[];
  title: string;
}

const SectionGrid = ({ songs, title }: SectionGridProps) => {
  const { initializeQueue } = usePlayerStore();

  const handlePlayAll = () => {
    if (songs.length > 0) {
      initializeQueue(songs);
    }
  };

  return (
    <div className='mb-8'>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-2xl font-bold text-white'>{title}</h2>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
        {songs.map((song) => (
          <div
            key={song.id}
            className='bg-zinc-800/40 p-4 rounded-md hover:bg-zinc-700/40 transition-all group cursor-pointer relative'
          >
            <div className='relative mb-4'>
              <div className='aspect-square rounded-md shadow-lg overflow-hidden'>
                <img
                  src={song.imageUrl}
                  alt={song.title}
                  className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
                />
              </div>
              <PlayButton song={song} />
            </div>
            <h3 className='font-medium mb-2 truncate text-white'>{song.title}</h3>
            <p className='text-sm text-zinc-400 truncate'>{song.artist}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionGrid;

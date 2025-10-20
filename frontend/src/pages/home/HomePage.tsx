import { useEffect } from "react";
import { useMusicStore } from "@/store/useMusicStore";
import { usePlayerStore } from "@/store/usePlayerStore";
import FeaturedGridSkeleton from "@/components/skeletons/FeaturedGridSkeleton";
import SectionGrid from "./components/SectionGrid";

const HomePage = () => {
  const {
    featuredSongs,
    madeForYouSongs,
    trendingSongs,
    isLoading,
    fetchFeaturedSongs,
    fetchMadeForYouSongs,
    fetchTrendingSongs,
  } = useMusicStore();

  const { initializeQueue } = usePlayerStore();

  useEffect(() => {
    fetchFeaturedSongs();
    fetchMadeForYouSongs();
    fetchTrendingSongs();
  }, [fetchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs]);

  // Initialize queue with featured songs when they load
  useEffect(() => {
    if (featuredSongs.length > 0 && !isLoading) {
      const allSongs = [...featuredSongs, ...madeForYouSongs, ...trendingSongs];
      initializeQueue(allSongs);
    }
  }, [featuredSongs, madeForYouSongs, trendingSongs, isLoading, initializeQueue]);

  return (
    <div className='min-h-screen bg-gradient-to-b from-zinc-800 to-zinc-900 p-4 sm:p-6'>
      <div className='max-w-7xl mx-auto'>
        <h1 className='text-3xl font-bold mb-6 text-white'>Good afternoon</h1>

        {/* Featured Songs */}
        <div className='mb-8'>
          <h2 className='text-2xl font-bold mb-4 text-white'>Featured</h2>
          {isLoading ? <FeaturedGridSkeleton /> : (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
              {featuredSongs.map((song) => (
                <div
                  key={song.id}
                  className='bg-zinc-800/40 p-4 rounded-md hover:bg-zinc-700/40 transition-all group cursor-pointer relative'
                >
                  <div className='relative mb-4'>
                    <div className='aspect-square rounded-md shadow-lg overflow-hidden'>
                      <img
                        src={song.imageUrl}
                        alt={song.title}
                        className='w-full h-full object-cover'
                      />
                    </div>
                  </div>
                  <h3 className='font-medium mb-2 truncate text-white'>{song.title}</h3>
                  <p className='text-sm text-zinc-400 truncate'>{song.artist}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Made For You */}
        {!isLoading && <SectionGrid songs={madeForYouSongs} title='Made For You' />}

        {/* Trending */}
        {!isLoading && <SectionGrid songs={trendingSongs} title='Trending Now' />}
      </div>
    </div>
  );
};

export default HomePage;

import { useEffect } from "react";
import { Link } from "react-router-dom";
import { HomeIcon, MessageCircle, LayoutDashboard, Library } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMusicStore } from "@/store/useMusicStore";
import { useAuthStore } from "@/store/authStore";
import PlaylistSkeleton from "@/components/skeletons/PlaylistSkeleton";

const LeftSidebar = () => {
  const { albums, isLoading, fetchAlbums } = useMusicStore();
  const { isAuthenticated, isAdmin } = useAuthStore();

  useEffect(() => {
    fetchAlbums();
  }, [fetchAlbums]);

  return (
    <div className='h-full flex flex-col gap-2 bg-zinc-900'>
      {/* Navigation */}
      <div className='p-4 space-y-2'>
        <Link to='/'>
          <div
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-zinc-800 transition-colors",
              "cursor-pointer"
            )}
          >
            <HomeIcon className='h-5 w-5 text-white' />
            <span className='font-semibold text-white'>Home</span>
          </div>
        </Link>

        {isAuthenticated && (
          <Link to='/chat'>
            <div
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-zinc-800 transition-colors",
                "cursor-pointer"
              )}
            >
              <MessageCircle className='h-5 w-5 text-white' />
              <span className='font-semibold text-white'>Messages</span>
            </div>
          </Link>
        )}

        {isAdmin && (
          <Link to='/admin'>
            <div
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-zinc-800 transition-colors",
                "cursor-pointer"
              )}
            >
              <LayoutDashboard className='h-5 w-5 text-white' />
              <span className='font-semibold text-white'>Admin Dashboard</span>
            </div>
          </Link>
        )}
      </div>

      {/* Albums Library */}
      <div className='flex-1 px-4'>
        <div className='flex items-center gap-3 px-4 py-2 mb-2'>
          <Library className='h-5 w-5 text-white' />
          <span className='font-semibold text-white'>Playlists</span>
        </div>

        <ScrollArea className='h-[calc(100vh-300px)]'>
          <div className='space-y-2'>
            {isLoading ? (
              <PlaylistSkeleton />
            ) : (
              albums.map((album) => (
                <Link key={album.id} to={`/albums/${album.id}`}>
                  <div
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-lg hover:bg-zinc-800 transition-colors",
                      "cursor-pointer group"
                    )}
                  >
                    <img
                      src={album.imageUrl}
                      alt={album.title}
                      className='h-12 w-12 rounded-md object-cover flex-shrink-0'
                    />
                    <div className='flex-1 min-w-0'>
                      <div className='font-medium text-white truncate'>{album.title}</div>
                      <div className='text-sm text-zinc-400 truncate'>Album • {album.artist}</div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default LeftSidebar;

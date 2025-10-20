import { Album } from "@/types";
import { Button } from "@/components/ui/button";
import { Calendar, Music, Trash2 } from "lucide-react";
import { useMusicStore } from "@/store/useMusicStore";

interface AlbumsTableProps {
  albums: Album[];
}

const AlbumsTable = ({ albums }: AlbumsTableProps) => {
  const { deleteAlbum } = useMusicStore();

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this album?")) {
      await deleteAlbum(id);
    }
  };

  return (
    <div className='space-y-2'>
      {albums.map((album) => (
        <div
          key={album.id}
          className='flex items-center justify-between p-4 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-colors'
        >
          <div className='flex items-center gap-4 flex-1'>
            <img
              src={album.imageUrl}
              alt={album.title}
              className='h-12 w-12 rounded object-cover'
            />
            <div className='flex-1 min-w-0'>
              <h3 className='font-medium text-white truncate'>{album.title}</h3>
              <p className='text-sm text-zinc-400 truncate'>{album.artist}</p>
            </div>
            <div className='hidden md:flex items-center gap-4 text-sm text-zinc-400'>
              <div className='flex items-center gap-1'>
                <Music className='h-4 w-4' />
                <span>{album.songs?.length || 0} songs</span>
              </div>
              {album.releaseYear && (
                <div className='flex items-center gap-1'>
                  <Calendar className='h-4 w-4' />
                  <span>{album.releaseYear}</span>
                </div>
              )}
            </div>
          </div>
          <Button
            variant='ghost'
            size='icon'
            onClick={() => handleDelete(album.id)}
            className='text-red-400 hover:text-red-300 hover:bg-red-400/10'
          >
            <Trash2 className='h-5 w-5' />
          </Button>
        </div>
      ))}
    </div>
  );
};

export default AlbumsTable;

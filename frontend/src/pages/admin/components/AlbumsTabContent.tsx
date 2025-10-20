import { useState, useEffect } from "react";
import { useMusicStore } from "@/store/useMusicStore";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AlbumsTable from "./AlbumsTable";
import AddAlbumDialog from "./AddAlbumDialog";

const AlbumsTabContent = () => {
  const { albums, fetchAlbums } = useMusicStore();
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  useEffect(() => {
    fetchAlbums();
  }, [fetchAlbums]);

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <h2 className='text-2xl font-bold text-white'>Manage Albums</h2>
        <Button onClick={() => setAddDialogOpen(true)} className='gap-2'>
          <Plus className='h-4 w-4' />
          Add Album
        </Button>
      </div>

      <AlbumsTable albums={albums} />

      <AddAlbumDialog open={addDialogOpen} onOpenChange={setAddDialogOpen} />
    </div>
  );
};

export default AlbumsTabContent;

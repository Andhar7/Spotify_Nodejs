import { useState, useEffect } from "react";
import { useMusicStore } from "@/store/useMusicStore";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import SongsTable from "./SongsTable";
import AddSongDialog from "./AddSongDialog";

const SongsTabContent = () => {
  const { songs, fetchSongs } = useMusicStore();
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  useEffect(() => {
    fetchSongs();
  }, [fetchSongs]);

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <h2 className='text-2xl font-bold text-white'>Manage Songs</h2>
        <Button onClick={() => setAddDialogOpen(true)} className='gap-2'>
          <Plus className='h-4 w-4' />
          Add Song
        </Button>
      </div>

      <SongsTable songs={songs} />

      <AddSongDialog open={addDialogOpen} onOpenChange={setAddDialogOpen} />
    </div>
  );
};

export default SongsTabContent;

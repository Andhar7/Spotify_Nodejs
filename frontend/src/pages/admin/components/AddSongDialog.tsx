import { useState } from "react";
import { axiosInstance } from "@/lib/axios";
import { useMusicStore } from "@/store/useMusicStore";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/Input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload } from "lucide-react";
import toast from "react-hot-toast";

interface AddSongDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddSongDialog = ({ open, onOpenChange }: AddSongDialogProps) => {
  const { albums, fetchSongs } = useMusicStore();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    duration: "",
    albumId: "",
  });
  const [files, setFiles] = useState<{ audio: File | null; image: File | null }>({
    audio: null,
    image: null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!files.audio || !files.image) {
      toast.error("Please upload both audio and image files");
      return;
    }

    setIsLoading(true);

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("artist", formData.artist);
      data.append("duration", formData.duration);
      if (formData.albumId) data.append("albumId", formData.albumId);
      data.append("audioFile", files.audio);
      data.append("imageFile", files.image);

      await axiosInstance.post("/admin/songs", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Song added successfully");
      setFormData({ title: "", artist: "", duration: "", albumId: "" });
      setFiles({ audio: null, image: null });
      fetchSongs();
      onOpenChange(false);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to add song");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='bg-zinc-900 border-zinc-700 max-h-[80vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Add New Song</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='text-sm font-medium mb-2 block'>Title</label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              placeholder='Song title'
            />
          </div>

          <div>
            <label className='text-sm font-medium mb-2 block'>Artist</label>
            <Input
              value={formData.artist}
              onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
              required
              placeholder='Artist name'
            />
          </div>

          <div>
            <label className='text-sm font-medium mb-2 block'>Duration (seconds)</label>
            <Input
              type='number'
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              required
              placeholder='180'
            />
          </div>

          <div>
            <label className='text-sm font-medium mb-2 block'>Album (Optional)</label>
            <Select value={formData.albumId} onValueChange={(value) => setFormData({ ...formData, albumId: value })}>
              <SelectTrigger>
                <SelectValue placeholder='Select album' />
              </SelectTrigger>
              <SelectContent>
                {albums.map((album) => (
                  <SelectItem key={album.id} value={album.id}>
                    {album.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className='text-sm font-medium mb-2 block'>Audio File</label>
            <div className='flex items-center gap-2'>
              <Button type='button' variant='outline' className='w-full' asChild>
                <label>
                  <Upload className='h-4 w-4 mr-2' />
                  {files.audio ? files.audio.name : "Choose audio file"}
                  <input
                    type='file'
                    accept='audio/*'
                    className='hidden'
                    onChange={(e) => setFiles({ ...files, audio: e.target.files?.[0] || null })}
                  />
                </label>
              </Button>
            </div>
          </div>

          <div>
            <label className='text-sm font-medium mb-2 block'>Image File</label>
            <div className='flex items-center gap-2'>
              <Button type='button' variant='outline' className='w-full' asChild>
                <label>
                  <Upload className='h-4 w-4 mr-2' />
                  {files.image ? files.image.name : "Choose image file"}
                  <input
                    type='file'
                    accept='image/*'
                    className='hidden'
                    onChange={(e) => setFiles({ ...files, image: e.target.files?.[0] || null })}
                  />
                </label>
              </Button>
            </div>
          </div>

          <DialogFooter>
            <Button type='button' variant='outline' onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type='submit' disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Song"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddSongDialog;

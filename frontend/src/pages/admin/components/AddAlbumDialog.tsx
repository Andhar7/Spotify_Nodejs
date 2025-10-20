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
import { Upload } from "lucide-react";
import toast from "react-hot-toast";

interface AddAlbumDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddAlbumDialog = ({ open, onOpenChange }: AddAlbumDialogProps) => {
  const { fetchAlbums } = useMusicStore();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    releaseYear: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) {
      toast.error("Please upload an image file");
      return;
    }

    setIsLoading(true);

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("artist", formData.artist);
      data.append("releaseYear", formData.releaseYear);
      data.append("imageFile", imageFile);

      await axiosInstance.post("/admin/albums", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Album added successfully");
      setFormData({ title: "", artist: "", releaseYear: "" });
      setImageFile(null);
      fetchAlbums();
      onOpenChange(false);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to add album");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='bg-zinc-900 border-zinc-700 max-h-[80vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Add New Album</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='text-sm font-medium mb-2 block'>Title</label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              placeholder='Album title'
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
            <label className='text-sm font-medium mb-2 block'>Release Year</label>
            <Input
              type='number'
              value={formData.releaseYear}
              onChange={(e) => setFormData({ ...formData, releaseYear: e.target.value })}
              required
              placeholder='2024'
            />
          </div>

          <div>
            <label className='text-sm font-medium mb-2 block'>Image File</label>
            <div className='flex items-center gap-2'>
              <Button type='button' variant='outline' className='w-full' asChild>
                <label>
                  <Upload className='h-4 w-4 mr-2' />
                  {imageFile ? imageFile.name : "Choose image file"}
                  <input
                    type='file'
                    accept='image/*'
                    className='hidden'
                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
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
              {isLoading ? "Adding..." : "Add Album"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddAlbumDialog;

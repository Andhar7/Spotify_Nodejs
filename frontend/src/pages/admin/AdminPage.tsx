import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardStats from "./components/DashboardStats";
import SongsTabContent from "./components/SongsTabContent";
import AlbumsTabContent from "./components/AlbumsTabContent";

const AdminPage = () => {
  return (
    <div className='min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900 to-black p-6'>
      <div className='max-w-7xl mx-auto'>
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-white mb-2'>Admin Dashboard</h1>
          <p className='text-zinc-400'>Manage your music catalog</p>
        </div>

        <DashboardStats />

        <Tabs defaultValue='songs' className='space-y-6'>
          <TabsList className='bg-zinc-800 border-zinc-700'>
            <TabsTrigger value='songs'>Songs</TabsTrigger>
            <TabsTrigger value='albums'>Albums</TabsTrigger>
          </TabsList>

          <TabsContent value='songs'>
            <SongsTabContent />
          </TabsContent>

          <TabsContent value='albums'>
            <AlbumsTabContent />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPage;

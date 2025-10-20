import { Outlet } from "react-router-dom";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import LeftSidebar from "./components/LeftSidebar";
import FriendsActivity from "./components/FriendsActivity";
import AudioPlayer from "./components/AudioPlayer";
import PlaybackControls from "./components/PlaybackControls";
import { ScrollArea } from "@/components/ui/scroll-area";
import Topbar from "@/components/Topbar";

const MainLayout = () => {
  const isMobile = false; // You can add window size detection here if needed

  return (
    <div className='h-screen bg-black text-white flex flex-col'>
      <ResizablePanelGroup direction='horizontal' className='flex-1 flex h-full overflow-hidden'>
        {/* Left Sidebar */}
        <ResizablePanel defaultSize={20} minSize={10} maxSize={30}>
          <LeftSidebar />
        </ResizablePanel>

        <ResizableHandle className='w-2 bg-zinc-800 transition-colors hover:bg-zinc-700' />

        {/* Main Content */}
        <ResizablePanel defaultSize={isMobile ? 80 : 60} minSize={30}>
          <div className='flex flex-col h-full'>
            <Topbar />
            <ScrollArea className='flex-1'>
              <Outlet />
            </ScrollArea>
            <PlaybackControls />
          </div>
        </ResizablePanel>

        {!isMobile && (
          <>
            <ResizableHandle className='w-2 bg-zinc-800 transition-colors hover:bg-zinc-700' />

            {/* Right Sidebar - Friends Activity */}
            <ResizablePanel defaultSize={20} minSize={15} maxSize={25} collapsedSize={0}>
              <FriendsActivity />
            </ResizablePanel>
          </>
        )}
      </ResizablePanelGroup>

      {/* Hidden Audio Element */}
      <AudioPlayer />
    </div>
  );
};

export default MainLayout;

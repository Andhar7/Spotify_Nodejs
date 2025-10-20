import { Link } from "react-router-dom";
import { LayoutDashboard, LogOut } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

const Topbar = () => {
  const { user, isAdmin, logout } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logout();
      // Redirect handled by routing
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className='flex items-center justify-between p-4 sticky top-0 bg-zinc-900/75 backdrop-blur-md z-10 border-b border-zinc-800'>
      <div className='flex gap-2 items-center'>
        {/* Logo/Brand */}
        <Link to='/' className='text-white font-bold text-xl'>
          Spotify Clone
        </Link>
      </div>

      <div className='flex items-center gap-4'>
        {isAdmin && (
          <Link to='/admin'>
            <Button variant='outline' className='gap-2'>
              <LayoutDashboard className='h-4 w-4' />
              <span className='hidden md:inline'>Admin Dashboard</span>
            </Button>
          </Link>
        )}

        {user && (
          <div className='flex items-center gap-3'>
            <Avatar>
              <AvatarImage src={user.imageUrl || "/default-avatar.png"} />
              <AvatarFallback>{user.name?.[0] || "U"}</AvatarFallback>
            </Avatar>
            <div className='hidden md:block'>
              <p className='text-sm font-medium text-white'>{user.name}</p>
              <p className='text-xs text-zinc-400'>{user.email}</p>
            </div>
            <Button variant='ghost' size='icon' onClick={handleLogout}>
              <LogOut className='h-5 w-5' />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Topbar;

import { useEffect } from "react";
import { useMusicStore } from "@/store/useMusicStore";
import StatsCard from "./StatsCard";
import { Album, Music, User, Mic2 } from "lucide-react";

const DashboardStats = () => {
  const { stats, fetchStats } = useMusicStore();

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
      <StatsCard
        icon={Music}
        label='Total Songs'
        value={stats.totalSongs.toLocaleString()}
        bgColor='bg-emerald-500'
      />
      <StatsCard
        icon={Album}
        label='Total Albums'
        value={stats.totalAlbums.toLocaleString()}
        bgColor='bg-violet-500'
      />
      <StatsCard
        icon={Mic2}
        label='Total Artists'
        value={stats.totalArtists.toLocaleString()}
        bgColor='bg-orange-500'
      />
      <StatsCard
        icon={User}
        label='Total Users'
        value={stats.totalUsers.toLocaleString()}
        bgColor='bg-sky-500'
      />
    </div>
  );
};

export default DashboardStats;

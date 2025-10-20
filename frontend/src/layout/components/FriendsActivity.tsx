import { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChatStore } from "@/store/useChatStore";
import { useAuthStore } from "@/store/authStore";
import UsersListSkeleton from "@/components/skeletons/UsersListSkeleton";
import { Music } from "lucide-react";

const FriendsActivity = () => {
  const { users, fetchUsers, isLoading, onlineUsers, userActivities } = useChatStore();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      fetchUsers();
    }
  }, [isAuthenticated, fetchUsers]);

  if (!isAuthenticated) {
    return (
      <div className='h-full bg-zinc-900 flex flex-col items-center justify-center p-6 text-center'>
        <Music className='h-12 w-12 text-emerald-500 mb-4' />
        <h3 className='text-lg font-semibold text-white mb-2'>See What Friends Are Playing</h3>
        <p className='text-sm text-zinc-400 mb-4'>
          Login to see what music your friends are enjoying right now
        </p>
      </div>
    );
  }

  return (
    <div className='h-full bg-zinc-900 flex flex-col'>
      <div className='p-4 border-b border-zinc-800'>
        <h3 className='text-lg font-semibold text-white'>Friend Activity</h3>
        <p className='text-sm text-zinc-400'>
          {onlineUsers.size} {onlineUsers.size === 1 ? "friend" : "friends"} online
        </p>
      </div>

      <ScrollArea className='flex-1'>
        <div className='p-4 space-y-4'>
          {isLoading ? (
            <UsersListSkeleton />
          ) : users.length === 0 ? (
            <div className='text-center text-zinc-400 py-8'>
              <p>No users available</p>
            </div>
          ) : (
            users.map((user) => {
              const isOnline = onlineUsers.has(user.id.toString());
              const activity = userActivities.get(user.id.toString()) || "Idle";

              return (
                <div key={user.id} className='flex items-start gap-3'>
                  <div className='relative'>
                    <Avatar>
                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    {isOnline && (
                      <div className='absolute bottom-0 right-0 h-3 w-3 bg-emerald-500 rounded-full border-2 border-zinc-900' />
                    )}
                  </div>

                  <div className='flex-1 min-w-0'>
                    <div className='flex items-center gap-2'>
                      <span className='font-medium text-white text-sm truncate'>{user.name}</span>
                    </div>
                    <div className='text-xs text-zinc-400 mt-1'>
                      {activity === "Idle" ? (
                        <span>Idle</span>
                      ) : (
                        <div className='flex items-center gap-1'>
                          <Music className='h-3 w-3 text-emerald-500' />
                          <span className='truncate'>{activity}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default FriendsActivity;

const UsersListSkeleton = () => {
  return (
    <div className='space-y-2'>
      {[...Array(6)].map((_, i) => (
        <div key={i} className='flex items-center space-x-3 p-3'>
          <div className='h-12 w-12 bg-zinc-800 rounded-full animate-pulse' />
          <div className='flex-1 space-y-2'>
            <div className='h-4 bg-zinc-800 rounded w-24 animate-pulse' />
            <div className='h-3 bg-zinc-800/60 rounded w-32 animate-pulse' />
          </div>
        </div>
      ))}
    </div>
  );
};

export default UsersListSkeleton;

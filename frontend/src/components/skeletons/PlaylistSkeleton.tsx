const PlaylistSkeleton = () => {
  return (
    <div className='space-y-4'>
      {[...Array(4)].map((_, i) => (
        <div key={i} className='h-16 bg-zinc-800/40 rounded-md animate-pulse' />
      ))}
    </div>
  );
};

export default PlaylistSkeleton;

const FeaturedGridSkeleton = () => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8'>
      {[...Array(6)].map((_, i) => (
        <div key={i} className='h-[250px] bg-zinc-800/40 rounded-md animate-pulse' />
      ))}
    </div>
  );
};

export default FeaturedGridSkeleton;

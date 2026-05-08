const SidebarSkeleton = () => {
  const skeletonContacts = Array(7).fill(null);
  return (
    <aside className="h-full w-full sm:w-20 lg:w-80 border-r border-base-300 flex flex-col bg-base-100">
      {/* Header */}
      <div className="border-b border-base-300 px-4 py-4 space-y-3">
        <div className="flex items-center gap-2">
          <div className="skeleton size-5 rounded" />
          <div className="skeleton h-4 w-24 rounded hidden lg:block" />
        </div>
        <div className="skeleton h-9 w-full rounded-xl hidden lg:block" />
        <div className="skeleton h-4 w-32 rounded hidden lg:block" />
      </div>

      {/* Contacts */}
      <div className="overflow-y-auto flex-1 py-2">
        {skeletonContacts.map((_, i) => (
          <div key={i} className="flex items-center gap-3 px-4 py-3">
            <div className="skeleton size-11 rounded-full flex-shrink-0 mx-auto sm:mx-0" />
            <div className="hidden lg:flex flex-col gap-2 flex-1">
              <div className="skeleton h-3.5 w-32 rounded" />
              <div className="skeleton h-3 w-16 rounded" />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarSkeleton;

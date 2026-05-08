const MessageSkeleton = () => {
  const skeletonMessages = Array(5).fill(null);
  return (
    <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-5">
      {skeletonMessages.map((_, index) => (
        <div
          key={index}
          className={`flex items-end gap-3 ${index % 2 === 0 ? "" : "flex-row-reverse"}`}
        >
          <div className="skeleton size-9 rounded-full flex-shrink-0" />
          <div className={`flex flex-col gap-1.5 max-w-[60%] ${index % 2 === 0 ? "items-start" : "items-end"}`}>
            <div className="skeleton h-3 w-16 rounded" />
            <div className="skeleton h-10 rounded-2xl" style={{ width: `${120 + (index * 30) % 80}px` }} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;

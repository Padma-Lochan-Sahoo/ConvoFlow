import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Search, Users } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.fullName.toLowerCase().includes(search.toLowerCase());
    const matchesOnline = showOnlineOnly ? onlineUsers.includes(user._id) : true;
    return matchesSearch && matchesOnline;
  });

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-full sm:w-20 lg:w-80 border-r border-base-300 flex flex-col bg-base-100 transition-all duration-200">
      {/* Header */}
      <div className="border-b border-base-300 px-4 py-4">
        <div className="flex items-center gap-2 mb-3">
          <Users className="size-5 text-primary flex-shrink-0" />
          <span className="font-semibold hidden lg:block">Contacts</span>
        </div>

        {/* Search — desktop only */}
        <div className="hidden lg:flex items-center gap-2 bg-base-200 rounded-xl px-3 py-2 border border-base-300 focus-within:border-primary transition-colors mb-3">
          <Search className="size-4 text-base-content/40 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search contacts..."
            className="bg-transparent text-sm outline-none flex-1 placeholder:text-base-content/40"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Online filter */}
        <div className="hidden lg:flex items-center justify-between">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-xs checkbox-primary"
            />
            <span className="text-xs text-base-content/70">Online only</span>
          </label>
          <span className="text-xs text-base-content/50 bg-base-200 px-2 py-0.5 rounded-full">
            {Math.max(onlineUsers.length - 1, 0)} online
          </span>
        </div>
      </div>

      {/* User List */}
      <div className="overflow-y-auto flex-1 py-2">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => {
            const isOnline = onlineUsers.includes(user._id);
            const isSelected = selectedUser?._id === user._id;
            return (
              <button
                key={user._id}
                onClick={() => setSelectedUser(user)}
                className={`w-full px-3 sm:px-3 lg:px-4 py-3 flex items-center gap-3 transition-all duration-150 ${
                  isSelected ? "bg-primary/10 border-r-2 border-primary" : "hover:bg-base-200"
                }`}
              >
                {/* Avatar */}
                <div className="relative flex-shrink-0 mx-auto sm:mx-0">
                  <img
                    src={user.profilePic || "/avatar.png"}
                    alt={user.fullName}
                    className="size-11 rounded-full object-cover border-2 border-base-300"
                  />
                  {isOnline && (
                    <span className="absolute bottom-0 right-0 size-3 rounded-full bg-success ring-2 ring-base-100" />
                  )}
                </div>

                {/* Info — desktop only */}
                <div className="hidden lg:block flex-1 min-w-0 text-left">
                  <p className={`font-medium text-sm truncate ${isSelected ? "text-primary" : ""}`}>
                    {user.fullName}
                  </p>
                  <p className={`text-xs mt-0.5 ${isOnline ? "text-success" : "text-base-content/40"}`}>
                    {isOnline ? "Online" : "Offline"}
                  </p>
                </div>
              </button>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center py-10 gap-2 text-base-content/40">
            <Users className="size-8" />
            <p className="text-sm hidden lg:block">
              {search ? "No contacts found" : showOnlineOnly ? "No one online" : "No contacts yet"}
            </p>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;

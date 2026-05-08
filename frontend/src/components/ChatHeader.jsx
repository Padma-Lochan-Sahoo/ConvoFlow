import { ArrowLeft, X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const isOnline = onlineUsers.includes(selectedUser._id);

  return (
    <div className="p-3 border-b border-base-300 bg-base-100 sticky top-0 z-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Mobile back button */}
          <button
            className="sm:hidden btn btn-ghost btn-sm btn-circle"
            onClick={() => setSelectedUser(null)}
            aria-label="Back to contacts"
          >
            <ArrowLeft className="size-5" />
          </button>

          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img
                src={selectedUser.profilePic || "/avatar.png"}
                alt={selectedUser.fullName}
                className="object-cover rounded-full"
              />
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-sm">{selectedUser.fullName}</h3>
            <p className={`text-xs font-medium ${isOnline ? "text-success" : "text-base-content/50"}`}>
              {isOnline ? "● Online" : "○ Offline"}
            </p>
          </div>
        </div>

        {/* Desktop close button */}
        <button
          className="hidden sm:flex btn btn-ghost btn-sm btn-circle"
          onClick={() => setSelectedUser(null)}
          aria-label="Close chat"
        >
          <X className="size-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;

import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="flex-1 flex items-center justify-center bg-base-100">
      <div className="text-center px-6 max-w-sm">
        <div className="flex justify-center mb-6">
          <div className="size-20 rounded-2xl bg-primary/10 flex items-center justify-center shadow-inner">
            <MessageSquare className="size-10 text-primary" />
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-2">Welcome to ConvoFlow</h2>
        <p className="text-base-content/50 text-sm leading-relaxed">
          Select a contact from the sidebar to start a conversation. Your messages are real-time and end-to-end encrypted.
        </p>
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-base-content/30">
          <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
          Real-time messaging enabled
        </div>
      </div>
    </div>
  );
};

export default NoChatSelected;

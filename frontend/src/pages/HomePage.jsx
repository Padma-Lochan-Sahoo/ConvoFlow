import { useState } from "react";
import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-16 px-0 sm:px-4 h-full sm:h-auto sm:pt-20">
        <div className="bg-base-100 sm:rounded-lg sm:shadow-xl w-full max-w-6xl h-full sm:h-[calc(100vh-6rem)]">
          <div className="flex h-full sm:rounded-lg overflow-hidden">
            {/* On mobile: show sidebar OR chat, not both */}
            <div className={`${selectedUser ? "hidden sm:flex" : "flex"} w-full sm:w-auto`}>
              <Sidebar />
            </div>
            <div className={`${selectedUser ? "flex" : "hidden sm:flex"} flex-1`}>
              {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

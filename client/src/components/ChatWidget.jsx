import { useState } from "react";
import Chat from "../pages/Chat";

const ChatWidget = ({ user }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-5 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg z-50"
      >
        💬
      </button>

      {/* Chat Popup */}
      {open && (
        <div className="fixed bottom-20 right-5 w-[350px] h-[500px] bg-[#020617] rounded-2xl shadow-2xl border border-gray-700 z-50 flex flex-col overflow-hidden">
          
          {/* Header */}
          <div className="flex justify-between items-center p-3 border-b border-gray-700 bg-[#0f172a]">
            <span className="text-sm text-amber-50 font-semibold">🤖</span>
            <button onClick={() => setOpen(false)}>✖</button>
          </div>

          {/* Chat Body */}
          <div className="flex-1 overflow-hidden">
            <Chat user={user} />
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
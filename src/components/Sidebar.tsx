import React, { useState } from 'react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNewChat: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onNewChat }) => {
  const [chatHistory] = useState([
    { id: 1, title: 'React Development Tips', time: '2 hours ago' },
    { id: 2, title: 'JavaScript Best Practices', time: '1 day ago' },
    { id: 3, title: 'CSS Grid Layout', time: '3 days ago' },
    { id: 4, title: 'TypeScript Fundamentals', time: '1 week ago' },
    { id: 5, title: 'API Integration Guide', time: '2 weeks ago' },
  ]);

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-80 bg-chat-darker border-r border-chat-border z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 lg:static lg:z-auto`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-chat-border">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold text-white">Sparks GPT</h1>
              <button
                onClick={onClose}
                className="lg:hidden text-gray-400 hover:text-white transition-colors"
              >
                <i className="bi bi-x-lg text-xl"></i>
              </button>
            </div>
            <button
              onClick={onNewChat}
              className="w-full mt-4 bg-chat-green hover:bg-chat-green-hover text-white py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <i className="bi bi-plus-lg"></i>
              New Chat
            </button>
          </div>

          {/* Chat History */}
          <div className="flex-1 overflow-y-auto p-4">
            <h3 className="text-sm font-medium text-gray-400 mb-3 uppercase tracking-wide">Recent Chats</h3>
            <div className="space-y-2">
              {chatHistory.map((chat) => (
                <div
                  key={chat.id}
                  className="p-3 rounded-lg bg-chat-light hover:bg-chat-border cursor-pointer transition-colors duration-200 group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium truncate group-hover:text-chat-green transition-colors">
                        {chat.title}
                      </p>
                      <p className="text-gray-400 text-xs mt-1">{chat.time}</p>
                    </div>
                    <button className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-400 transition-all ml-2">
                      <i className="bi bi-trash3 text-sm"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-chat-border">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-chat-light hover:bg-chat-border transition-colors cursor-pointer">
              <div className="w-8 h-8 bg-chat-green rounded-full flex items-center justify-center">
                <i className="bi bi-person-fill text-white text-sm"></i>
              </div>
              <div className="flex-1">
                <p className="text-white text-sm font-medium">User</p>
                <p className="text-gray-400 text-xs">Free Plan</p>
              </div>
              <i className="bi bi-three-dots text-gray-400"></i>
            </div>
            <div className="mt-3 text-center">
              <p className="text-xs text-gray-500">Powered by Websparks AI</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

import React from 'react';

interface ChatMessageProps {
  message: {
    id: number;
    content: string;
    isUser: boolean;
    timestamp: string;
    isStreaming?: boolean;
  };
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className={`flex gap-4 p-6 ${message.isUser ? 'bg-chat-dark' : 'bg-chat-darker'} animate-slide-up`}>
      <div className="flex-shrink-0">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
          message.isUser ? 'bg-chat-green' : 'bg-purple-600'
        }`}>
          {message.isUser ? (
            <i className="bi bi-person-fill text-white text-sm"></i>
          ) : (
            <i className="bi bi-robot text-white text-sm"></i>
          )}
        </div>
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-white font-medium text-sm">
            {message.isUser ? 'You' : 'Sparks GPT'}
          </span>
          <span className="text-gray-400 text-xs">{message.timestamp}</span>
          {message.isStreaming && (
            <div className="flex items-center gap-1 ml-2">
              <div className="w-1 h-1 bg-chat-green rounded-full animate-pulse"></div>
              <div className="w-1 h-1 bg-chat-green rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-1 h-1 bg-chat-green rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          )}
        </div>
        
        <div className="text-gray-100 leading-relaxed whitespace-pre-wrap">
          {message.content}
          {message.isStreaming && (
            <span className="inline-block w-2 h-5 bg-chat-green animate-pulse ml-1"></span>
          )}
        </div>
        
        {!message.isUser && !message.isStreaming && message.content && (
          <div className="flex items-center gap-2 mt-4">
            <button 
              onClick={() => copyToClipboard(message.content)}
              className="text-gray-400 hover:text-white transition-colors p-1 rounded hover:bg-chat-light"
              title="Copy message"
            >
              <i className="bi bi-clipboard text-sm"></i>
            </button>
            <button className="text-gray-400 hover:text-white transition-colors p-1 rounded hover:bg-chat-light">
              <i className="bi bi-hand-thumbs-up text-sm"></i>
            </button>
            <button className="text-gray-400 hover:text-white transition-colors p-1 rounded hover:bg-chat-light">
              <i className="bi bi-hand-thumbs-down text-sm"></i>
            </button>
            <button className="text-gray-400 hover:text-white transition-colors p-1 rounded hover:bg-chat-light">
              <i className="bi bi-arrow-clockwise text-sm"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;

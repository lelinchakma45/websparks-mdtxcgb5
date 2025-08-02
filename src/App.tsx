import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './components/Sidebar';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import EmptyState from './components/EmptyState';
import ErrorMessage from './components/ErrorMessage';
import { useGroqChat } from './hooks/useGroqChat';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { 
    messages, 
    isLoading, 
    error, 
    sendMessage, 
    clearMessages, 
    clearError 
  } = useGroqChat();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    await sendMessage(content);
  };

  const handleNewChat = () => {
    clearMessages();
    clearError();
    setIsSidebarOpen(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  const handleRetryLastMessage = () => {
    const lastUserMessage = messages.filter(msg => msg.isUser).pop();
    if (lastUserMessage) {
      clearError();
      handleSendMessage(lastUserMessage.content);
    }
  };

  return (
    <div className="h-screen bg-chat-dark flex overflow-hidden">
      {/* Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)}
        onNewChat={handleNewChat}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-chat-darker border-b border-chat-border p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-chat-light"
            >
              <i className="bi bi-list text-xl"></i>
            </button>
            <h1 className="text-white font-semibold text-lg">Sparks GPT</h1>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-chat-green bg-opacity-20 rounded-full">
              <div className="w-2 h-2 bg-chat-green rounded-full animate-pulse"></div>
              <span className="text-chat-green text-xs font-medium">Groq AI</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-chat-light">
              <i className="bi bi-gear"></i>
            </button>
            <button className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-chat-light">
              <i className="bi bi-question-circle"></i>
            </button>
          </div>
        </header>

        {/* Error Message */}
        {error && (
          <ErrorMessage 
            error={error} 
            onDismiss={clearError}
            onRetry={handleRetryLastMessage}
          />
        )}

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            <EmptyState onSuggestionClick={handleSuggestionClick} />
          ) : (
            <div className="max-w-4xl mx-auto">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              {isLoading && messages.length > 0 && !messages[messages.length - 1]?.isStreaming && (
                <div className="flex gap-4 p-6 bg-chat-darker animate-fade-in">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
                      <i className="bi bi-robot text-white text-sm"></i>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-white font-medium text-sm">Sparks GPT</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
}

export default App;

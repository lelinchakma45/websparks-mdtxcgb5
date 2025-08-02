import { useState, useCallback } from 'react';
import { groqService, ChatMessage as GroqMessage } from '../services/groqService';

interface Message {
  id: number;
  content: string;
  isUser: boolean;
  timestamp: string;
  isStreaming?: boolean;
}

export const useGroqChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(async (content: string) => {
    const userMessage: Message = {
      id: Date.now(),
      content,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    // Create AI message placeholder
    const aiMessageId = Date.now() + 1;
    const aiMessage: Message = {
      id: aiMessageId,
      content: '',
      isUser: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isStreaming: true
    };

    setMessages(prev => [...prev, aiMessage]);

    try {
      // Convert messages to Groq format
      const groqMessages: GroqMessage[] = messages
        .filter(msg => !msg.isStreaming)
        .map(msg => ({
          role: msg.isUser ? 'user' : 'assistant',
          content: msg.content
        }));

      // Add current user message
      groqMessages.push({
        role: 'user',
        content
      });

      let accumulatedContent = '';

      await groqService.generateStreamResponse(
        groqMessages,
        (chunk: string) => {
          accumulatedContent += chunk;
          setMessages(prev => 
            prev.map(msg => 
              msg.id === aiMessageId 
                ? { ...msg, content: accumulatedContent }
                : msg
            )
          );
        },
        () => {
          setMessages(prev => 
            prev.map(msg => 
              msg.id === aiMessageId 
                ? { ...msg, isStreaming: false }
                : msg
            )
          );
          setIsLoading(false);
        },
        (errorMessage: string) => {
          setError(errorMessage);
          setMessages(prev => prev.filter(msg => msg.id !== aiMessageId));
          setIsLoading(false);
        }
      );
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      setMessages(prev => prev.filter(msg => msg.id !== aiMessageId));
      setIsLoading(false);
    }
  }, [messages]);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages,
    clearError
  };
};

import React from 'react';

interface EmptyStateProps {
  onSuggestionClick?: (suggestion: string) => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onSuggestionClick }) => {
  const suggestions = [
    {
      icon: 'bi-code-slash',
      title: 'Write code',
      description: 'Help me write a React component',
      prompt: 'Can you help me create a React component for a todo list with TypeScript?'
    },
    {
      icon: 'bi-lightbulb',
      title: 'Get ideas',
      description: 'Brainstorm creative solutions',
      prompt: 'I need creative ideas for improving user engagement on my website. Can you help?'
    },
    {
      icon: 'bi-question-circle',
      title: 'Ask questions',
      description: 'Explain complex concepts',
      prompt: 'Can you explain how React hooks work and when to use them?'
    },
    {
      icon: 'bi-pencil-square',
      title: 'Create content',
      description: 'Write articles or documentation',
      prompt: 'Help me write documentation for a REST API with authentication.'
    }
  ];

  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-chat-green to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="bi bi-robot text-white text-2xl"></i>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome to Sparks GPT</h1>
          <p className="text-gray-400 text-lg">Powered by Groq AI • How can I help you today?</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              onClick={() => onSuggestionClick?.(suggestion.prompt)}
              className="p-4 bg-chat-light hover:bg-chat-border rounded-xl cursor-pointer transition-all duration-200 hover:scale-105 group"
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-chat-green bg-opacity-20 rounded-lg flex items-center justify-center group-hover:bg-opacity-30 transition-colors">
                  <i className={`${suggestion.icon} text-chat-green`}></i>
                </div>
                <div className="text-left">
                  <h3 className="text-white font-medium mb-1">{suggestion.title}</h3>
                  <p className="text-gray-400 text-sm">{suggestion.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-xs text-gray-500">
          <p>Powered by Websparks AI • Advanced AI Assistant with Groq Inference</p>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;

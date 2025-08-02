import React from 'react';

interface ErrorMessageProps {
  error: string;
  onDismiss: () => void;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error, onDismiss, onRetry }) => {
  return (
    <div className="mx-4 mb-4 p-4 bg-red-900 bg-opacity-20 border border-red-500 border-opacity-30 rounded-lg animate-fade-in">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <i className="bi bi-exclamation-triangle-fill text-red-400 text-lg"></i>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-red-300 font-medium mb-1">Error</h4>
          <p className="text-red-200 text-sm">{error}</p>
        </div>
        <div className="flex items-center gap-2">
          {onRetry && (
            <button
              onClick={onRetry}
              className="text-red-300 hover:text-red-200 transition-colors p-1 rounded hover:bg-red-800 hover:bg-opacity-30"
              title="Retry"
            >
              <i className="bi bi-arrow-clockwise text-sm"></i>
            </button>
          )}
          <button
            onClick={onDismiss}
            className="text-red-300 hover:text-red-200 transition-colors p-1 rounded hover:bg-red-800 hover:bg-opacity-30"
            title="Dismiss"
          >
            <i className="bi bi-x-lg text-sm"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;

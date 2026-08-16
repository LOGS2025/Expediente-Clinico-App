// components/ui/ErrorMessage.tsx
'use client';

import { useEffect, useState } from 'react';

interface ErrorMessageProps {
  message: string | null;
  onClose?: () => void;
  autoHideDuration?: number; // in milliseconds
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center';
  className?: string;
}

const ErrorMessage = ({
  message,
  onClose,
  autoHideDuration,
  position = 'bottom-right',
  className = '',
}: ErrorMessageProps) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(true);
  }, [message]);

  useEffect(() => {
    if (autoHideDuration && message) {
      const timer = setTimeout(() => {
        setVisible(false);
        onClose?.();
      }, autoHideDuration);
      return () => clearTimeout(timer);
    }
  }, [message, autoHideDuration, onClose]);

  if (!message || !visible) return null;

  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'top-center': 'top-4 left-1/2 -translate-x-1/2',
    'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
  };

  return (
    <div 
      className={`fixed z-50 ${positionClasses[position]} ${className}`}
      role="alert"
    >
      <div className="flex items-center gap-3 px-4 py-3 bg-red-50 border border-red-200 rounded-xl shadow-lg max-w-md">
        {/* Icon */}
        <div className="flex-shrink-0">
          <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        </div>

        {/* Message */}
        <p className="flex-1 text-sm text-red-600 font-medium">
          {message}
        </p>

        {/* Close button */}
        <button
          onClick={() => {
            setVisible(false);
            onClose?.();
          }}
          className="flex-shrink-0 text-red-400 hover:text-red-600 transition-colors"
          aria-label="Close error"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ErrorMessage;
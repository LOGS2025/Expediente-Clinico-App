'use client';

interface LoadingScreenProps {
  message?: string;
  subMessage?: string;
}

const LoadingScreen = ({ 
  message = 'Conectando con el servidor...',
  subMessage = 'Por favor espera un momento'
}: LoadingScreenProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="text-center space-y-6">
        {/* Spinner */}
        <div className="relative w-20 h-20 mx-auto">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border-4 border-white/10" />
          
          {/* Spinning ring */}
          <div className="absolute inset-0 rounded-full border-4 border-t-blue-500 border-r-blue-500 border-b-transparent border-l-transparent animate-spin" />
          
          {/* Inner glow */}
          <div className="absolute inset-2 rounded-full bg-blue-500/10 blur-xl" />
          
          {/* Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="material-symbols-outlined text-white/40 text-3xl animate-pulse">
              videocam
            </span>
          </div>
        </div>

        {/* Text */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-white">
            {message}
          </h2>
          <p className="text-sm text-white/40">
            {subMessage}
          </p>
        </div>

        {/* Dots animation */}
        <div className="flex items-center justify-center gap-2 pt-2">
          <div className="w-2 h-2 rounded-full bg-white/20 animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 rounded-full bg-white/20 animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 rounded-full bg-white/20 animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
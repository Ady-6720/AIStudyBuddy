import React from 'react';
import { Brain, Sparkles } from 'lucide-react';

const SplashScreen = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex flex-col items-center justify-center">
      <div className="text-center space-y-4">
        {/* Logo Animation */}
        <div className="relative">
          <Brain 
            size={64} 
            className="text-purple-600 animate-pulse"
          />
          <Sparkles 
            size={24} 
            className="text-yellow-500 absolute -top-2 -right-2 animate-bounce"
          />
        </div>

        {/* App Name with Gradient */}
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 animate-fade-in">
          Study Buddy
        </h1>

        {/* Loading Animation */}
        <div className="flex space-x-2 justify-center">
          <div className="w-3 h-3 rounded-full bg-purple-600 animate-bounce" style={{ animationDelay: '0s' }} />
          <div className="w-3 h-3 rounded-full bg-purple-600 animate-bounce" style={{ animationDelay: '0.2s' }} />
          <div className="w-3 h-3 rounded-full bg-purple-600 animate-bounce" style={{ animationDelay: '0.4s' }} />
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
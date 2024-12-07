import React from 'react';
import { ArrowLeft } from 'lucide-react';

const Header = ({ title, showBack = true, onBack }) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm shadow-sm">
      <div className="flex items-center p-4">
        {showBack && (
          <button 
            onClick={onBack}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors mr-2"
          >
            <ArrowLeft size={24} className="text-gray-600" />
          </button>
        )}
        <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
          {title}
        </h1>
      </div>
    </div>
  );
};

export default Header;
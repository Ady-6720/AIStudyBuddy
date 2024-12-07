import React from 'react';

const ScreenTransition = ({ children, className = '' }) => {
  return (
    <div 
      className={`animate-fade-slide-in ${className}`}
    >
      {children}
    </div>
  );
};

export default ScreenTransition;
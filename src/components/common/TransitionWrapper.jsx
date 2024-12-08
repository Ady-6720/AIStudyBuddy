import React from 'react';

const TransitionWrapper = ({ children, type = 'fadeUp', className = '' }) => {
  const transitions = {
    fadeUp: 'animate-fadeUp',
    slideLeft: 'animate-slideLeft',
    slideRight: 'animate-slideRight',
    scale: 'animate-scale'
  };

  return (
    <div className={`${transitions[type]} ${className}`}>
      {children}
    </div>
  );
};

export default TransitionWrapper;
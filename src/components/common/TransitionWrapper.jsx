import React from 'react';
import { transitions } from '../../utils/transitions';

const TransitionWrapper = ({ 
  children, 
  type = 'fadeUp', 
  className = '',
  show = true 
}) => {
  const currentTransition = transitions[type];

  return (
    <div className={`${show ? currentTransition.enter : currentTransition.exit} ${className}`}>
      {children}
    </div>
  );
};

export default TransitionWrapper;
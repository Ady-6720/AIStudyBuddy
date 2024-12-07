import React, { useEffect, useState } from 'react';

const TransitionScreen = ({ children, show, type = 'fade' }) => {
  const [mounted, setMounted] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  const transitions = {
    slide: {
      enter: "transform transition-all duration-300 ease-out",
      enterFrom: "translate-x-full opacity-0",
      enterTo: "translate-x-0 opacity-100",
      leave: "transform transition-all duration-300 ease-in",
      leaveFrom: "translate-x-0 opacity-100",
      leaveTo: "-translate-x-full opacity-0",
    },
    fade: {
      enter: "transition-opacity duration-200 ease-out",
      enterFrom: "opacity-0",
      enterTo: "opacity-100",
      leave: "transition-opacity duration-200 ease-in",
      leaveFrom: "opacity-100",
      leaveTo: "opacity-0",
    }
  };

  useEffect(() => {
    if (show) {
      setMounted(true);
      setTransitioning(true);
      const timer = setTimeout(() => setTransitioning(false), 10);
      return () => clearTimeout(timer);
    } else {
      setTransitioning(true);
      const timer = setTimeout(() => setMounted(false), 300);
      return () => clearTimeout(timer);
    }
  }, [show]);

  if (!mounted) return null;

  const currentTransition = transitions[type];
  const transitionClasses = transitioning
    ? `${currentTransition.enter} ${currentTransition.enterFrom}`
    : `${currentTransition.enter} ${currentTransition.enterTo}`;

  return (
    <div className={transitionClasses}>
      {children}
    </div>
  );
};

export default TransitionScreen;
export const slideTransitions = {
    enter: {
      from: "transform translate-x-full opacity-0",
      to: "transform translate-x-0 opacity-100",
    },
    exit: {
      from: "transform translate-x-0 opacity-100",
      to: "transform -translate-x-full opacity-0",
    },
    duration: "duration-300",
  };
  
  export const fadeTransitions = {
    enter: {
      from: "opacity-0",
      to: "opacity-100",
    },
    exit: {
      from: "opacity-100",
      to: "opacity-0",
    },
    duration: "duration-200",
  };
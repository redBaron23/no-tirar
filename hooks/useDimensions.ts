"use client";

export const useDimensions = () => {
  const browserSearchBarHeight = "80px"; //`${window.outerHeight - window.innerHeight}px`;

  return {
    browserSearchBarHeight,
  };
};

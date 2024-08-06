"use client";

export const useDimensions = () => {
  const browserSearchBarHeight = `${window.outerHeight - window.innerHeight}px`;

  return {
    browserSearchBarHeight,
  };
};

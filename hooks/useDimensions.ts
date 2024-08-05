"use client";

export const useDimensions = () => {
  const browserSearchBarHeight = window.outerHeight - window.innerHeight;

  return {
    browserSearchBarHeight,
  };
};

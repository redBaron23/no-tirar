"use client";

import { useEffect, useState } from "react";

const browserSearchBarHeight = "120px";

export const useDimensions = () => {
  const [width, setWidth] = useState<number>(window.innerWidth);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 768;

  return {
    browserSearchBarHeight,
    isMobile,
  };
};

import { useContext } from "react";
import ImageManagerContext from "../contexts/index";

export function useImageManager() {
  const { isDisplayedImageManager, setIsDisplayedImageManager } =
    useContext(ImageManagerContext);

  return { isDisplayedImageManager, setIsDisplayedImageManager };
}

import { useState, useEffect } from "react";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}

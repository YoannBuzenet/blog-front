import { useContext } from "react";
import ImageManagerContext from "../contexts/index";

export function useImageManager() {
  const { isDisplayedImageManager, setIsDisplayedImageManager } =
    useContext(ImageManagerContext);

  return { isDisplayedImageManager, setIsDisplayedImageManager };
}

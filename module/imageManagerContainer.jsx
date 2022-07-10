import { useState } from "react";
import ImageManagerContext from "./contexts/index";
import ImageManager from "./imageManager";

const ImageManagerContainer = ({ children }) => {
  const [isDisplayedImageManager, setIsDisplayedImageManager] = useState(false);

  const context = {
    isDisplayedImageManager,
    setIsDisplayedImageManager,
  };

  return (
    <ImageManagerContext.Provider value={context}>
      <ImageManager />
      {children}
    </ImageManagerContext.Provider>
  );
};

export default ImageManagerContainer;

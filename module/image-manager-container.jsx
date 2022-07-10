import { useState } from "react";
import ImageManagerContext from "./contexts/index";

const ImageManagerContainer = ({ children }) => {
  const [isDisplayedImageManager, setIsDisplayedImageManager] = useState(false);

  const context = {
    isDisplayedImageManager,
    setIsDisplayedImageManager,
  };

  return (
    <ImageManagerContext.Provider value={context}>
      {children}
    </ImageManagerContext.Provider>
  );
};

export default ImageManagerContainer;

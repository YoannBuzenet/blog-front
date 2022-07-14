import React from "react";

export default React.createContext({
  cropProperties: { aspectRatio: 2 },
  isDisplayedImageManager: false,
  setIsDisplayedImageManager: (value) => {},
});

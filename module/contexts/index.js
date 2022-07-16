import React from "react";

export default React.createContext({
  cropProperties: { aspectRatio: 2 },
  urlUpload: null,
  isDisplayedImageManager: false,
  setIsDisplayedImageManager: (value) => {},
});

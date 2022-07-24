import React from "react";

export default React.createContext({
  cropProperties: {
    cropAspectRatio: null,
    cropMinWidth: null,
    cropMinHeight: null,
    cropMaxWidth: null,
    cropMaxHeight: null,
    cropKeepSelection: null,
    cropDisabled: null,
    cropLocked: null,
    cropClassName: null,
    cropstyle: null,
    cropOnComplete: null,
    cropPercentCrop: null,
    cropOnDragStart: null,
    cropOnDragEnd: null,
    cropRenderSelectionAddon: null,
    cropRuleOfThirds: null,
    cropCircularCrop: null,
  },
  uploadProperties: {
    urlUpload: null,
    axiosHeaders: {},
    onSuccessUpload: null,
    onFailureupload: null,
    imageFields: ["name"],
    minWidthImageUpload: null,
  },
  isDisplayedImageManager: false,
  setIsDisplayedImageManager: (value) => {},
});

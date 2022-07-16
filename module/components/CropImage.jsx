import { useContext, useState } from "react";
import ReactCrop from "react-image-crop";
import { useCustomizedStyle } from "../style/crop.js";
import ImageManagerContext from "../contexts/index";

function CropImage({ src, crop, setCrop }) {
  const { cropProperties } = useContext(ImageManagerContext);

  console.log("crop", crop);
  const classes = useCustomizedStyle()();
  console.log(cropProperties);
  return (
    <ReactCrop
      crop={crop}
      onChange={(c) => setCrop(c)}
      aspect={cropProperties.cropAspectRatio}
      minWidth={cropProperties.cropMinWidth}
      minHeight={cropProperties.cropMinHeight}
      maxWidth={cropProperties.cropMaxWidth}
      maxHeight={cropProperties.cropMaxHeight}
      keepSelection={cropProperties.cropKeepSelection}
      disabled={cropProperties.cropDisabled}
      locked={cropProperties.cropLocked}
      className={cropProperties.cropClassName}
      style={cropProperties.cropstyle}
      onComplete={cropProperties.cropOnComplete}
      percentCrop={cropProperties.cropPercentCrop}
      onDragStart={cropProperties.cropOnDragStart}
      onDragEnd={cropProperties.cropOnDragEnd}
      renderSelectionAddon={cropProperties.cropRenderSelectionAddon}
      ruleOfThirds={cropProperties.cropRuleOfThirds}
      circularCrop={cropProperties.cropCircularCrop}
    >
      <img src={src} className={classes.image} />
    </ReactCrop>
  );
}

export default CropImage;

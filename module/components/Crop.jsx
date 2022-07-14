import { useState } from "react";
import ReactCrop from "react-image-crop";
import { useCustomizedStyle } from "../style/crop.js";

function CropImage({ src }) {
  const [crop, setCrop] = useState();
  console.log("crop", crop);
  const classes = useCustomizedStyle()();
  return (
    <ReactCrop crop={crop} onChange={(c) => setCrop(c)}>
      <img src={src} className={classes.image} />
    </ReactCrop>
  );
}

export default CropImage;

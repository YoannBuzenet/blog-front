import { useContext, useState } from "react";
import ReactCrop from "react-image-crop";
import { useCustomizedStyle } from "../style/crop.js";
import ImageManagerContext from "../contexts/index";

function CropImage({ src }) {
  const [crop, setCrop] = useState();
  const { cropProperties } = useContext(ImageManagerContext);
  console.log("crop", crop);
  const classes = useCustomizedStyle()();
  console.log(cropProperties.aspectRatio);
  return (
    <ReactCrop
      crop={crop}
      onChange={(c) => setCrop(c)}
      aspect={cropProperties.aspectRatio}
    >
      <img src={src} className={classes.image} />
    </ReactCrop>
  );
}

export default CropImage;

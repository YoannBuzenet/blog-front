import { useState } from "react";
import ReactCrop from "react-image-crop";

function CropImage({ src }) {
  const [crop, setCrop] = useState();
  console.log("crop", crop);
  return (
    <ReactCrop crop={crop} onChange={(c) => setCrop(c)}>
      <img src={src} height={500} />
    </ReactCrop>
  );
}

export default CropImage;

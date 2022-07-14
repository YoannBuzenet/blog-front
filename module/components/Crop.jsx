import { useState } from "react";
import ReactCrop from "react-image-crop";

function CropImage({ src }) {
  const [crop, setCrop] = useState();
  return (
    <ReactCrop crop={crop} onChange={(c) => setCrop(c)}>
      <img src={src} />
    </ReactCrop>
  );
}

export default CropImage;

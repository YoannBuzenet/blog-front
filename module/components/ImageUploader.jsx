import { useContext, useState } from "react";
import { useCustomizedStyle } from "../style/imageUploader.js";
import CropImage from "./CropImage.jsx";
import ImageManagerContext from "../contexts/index";
import axios from "axios";

const ImageUploader = () => {
  const classes = useCustomizedStyle()();
  const [documentUploaded, setDocumentUploaded] = useState(null);
  const [crop, setCrop] = useState();

  const { uploadProperties } = useContext(ImageManagerContext);

  const handleChange = (event) => {
    const { target } = event;
    const { files } = target;
    const file = files[0];
    setDocumentUploaded(URL.createObjectURL(file));
  };

  const handleUpload = async (event) => {
    // crop format example
    // height: 173.25559997558594
    // unit: "px"
    // width: 346.5111999511719
    // x: 139.39031982421875
    // y: 37.63502502441406

    try {
      const resp = await axios.post(
        uploadProperties.urlUpload,
        crop,
        uploadProperties.axiosHeaders
      );

      // Success callback function if defined
      if (uploadProperties.onSuccessUpload) {
        uploadProperties.onSuccessUpload(resp);
      }
    } catch (e) {
      // Failure callback function if defined
      if (uploadProperties.onFailureupload) {
        uploadProperties.onFailureupload(e);
      } else {
        console.log("Error while uploading picture. Error :", e);
      }
    }
  };

  return (
    <div>
      {documentUploaded && (
        <CropImage src={documentUploaded} crop={crop} setCrop={setCrop} />
      )}
      <div
        className={documentUploaded ? classes.uploaded : classes.nonUploaded}
      >
        <div className={classes.inputContainer}>
          <input
            type="file"
            name="myfile"
            className="customFileInput"
            onChange={handleChange}
            accept="image/png, image/jpeg"
          />
        </div>
        {documentUploaded && (
          <div className={classes.inputContainer}>
            <button className="customFileInput" onClick={handleUpload}>
              UPLOAD
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// Le back va recevoir l'image, la découper avec Node et les infos, et la sauvegarder, et renvoyer une 200 (mettre le snippet sur github pour aider)
// On passe sur la gallery (multi/mono select, pagination)
// On peut choisir les modes à activer sur l'image manager

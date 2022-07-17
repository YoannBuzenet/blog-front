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

  const defaultStateFields = uploadProperties.imageFields.reduce(
    (total, current) => {
      total[current] = "";
      return total;
    },
    {}
  );

  const [fields, setFields] = useState(defaultStateFields);

  const handleChange = (event) => {
    const { target } = event;
    const { files } = target;
    const file = files[0];
    setDocumentUploaded(URL.createObjectURL(file));
  };

  const handleChangeFields = (e, name) => {
    setFields({ ...fields, [name]: e.target.value });
  };

  const handleUpload = async (event) => {
    // crop format example
    // height: 173.25559997558594
    // unit: "px"
    // width: 346.5111999511719
    // x: 139.39031982421875
    // y: 37.63502502441406

    if (!uploadProperties.urlUpload) {
      throw "urlUpload prop is not defined. It is needed to know where to send the data uploaded.";
    }

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
        <div className={classes.fieldContainer}>
          {documentUploaded &&
            uploadProperties.imageFields.map((name, index) => (
              <label key={index} htmlFor={name}>
                {name}
                <input
                  id={name}
                  value={fields?.[name]}
                  onChange={(e) => handleChangeFields(e, name)}
                />
              </label>
            ))}
        </div>
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
// Endpoint back
// Gestion image avec les data de crop
// Sauvegarder l'image
// Renvoyer une 200 ou 500

// On passe sur la gallery (multi/mono select, pagination)
//
// On peut choisir les modes à activer sur l'image manager
//

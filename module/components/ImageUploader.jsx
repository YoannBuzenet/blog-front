import { useState } from "react";
import { useCustomizedStyle } from "../style/imageUploader.js";
import CropImage from "./Crop.jsx";

const ImageUploader = () => {
  const classes = useCustomizedStyle()();
  const [documentUploaded, setDocumentUploaded] = useState(null);

  const handleChange = (event) => {
    const { target } = event;
    const { files } = target;
    const file = files[0];
    setDocumentUploaded(URL.createObjectURL(file));
  };

  return (
    <>
      <p>Upload screen</p>
      {documentUploaded && <CropImage src={documentUploaded} />}
      <div
        className={documentUploaded ? classes.uploaded : classes.nonUploaded}
      >
        <div>
          <input
            type="file"
            name="myfile"
            className="customFileInput"
            onChange={handleChange}
            accept="image/png, image/jpeg"
          />
        </div>
        <div>
          <button>UPLOAD</button>
        </div>
      </div>
    </>
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
//
// L'image uploader empeche l'image uploadée d'être trop grande (une résolution max !)
// L'image uploader permet d'afficher le resizer une fois le fichier choisi
// L'image uploader permet d'afficher le bouton Upload
// L'image uploader permet d'executer la fonction de callBack sur succes d'upload

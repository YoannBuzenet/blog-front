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
    <div>
      <p>Upload screen</p>
      {documentUploaded && <CropImage src={documentUploaded} />}
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
        <div className={classes.inputContainer}>
          <button>UPLOAD</button>
        </div>
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
//
// L'image uploader empeche l'image uploadée d'être trop grande à l'initialisation (une résolution max !)
// L'image uploader permet d'afficher le resizer une fois le fichier choisi
// L'image uploader permet de forcer une size précise de l'image
// L'image uploader permet de zoom/rotate
// L'image uploader permet upload le fichier et envoie les informations à l'endpoint back
// L'image uploader permet d'executer la fonction de callBack sur succes d'upload
// Le back va recevoir l'image, la découper avec Node et les infos, et la sauvegarder, et renvoyer une 200 (mettre le snippet sur github pour aider)

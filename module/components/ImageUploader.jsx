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
        {documentUploaded && (
          <div className={classes.inputContainer}>
            <button className="customFileInput">UPLOAD</button>
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
// Le display des boutons et de la zone de droite doit faire propre
// L'image uploader permet de forcer une size précise de l'image
// L'image uploader permet de zoom/rotate
// L'image uploader permet upload le fichier et envoie les informations à l'endpoint back
// L'image uploader permet d'executer la fonction de callBack sur succes d'upload
// Le back va recevoir l'image, la découper avec Node et les infos, et la sauvegarder, et renvoyer une 200 (mettre le snippet sur github pour aider)

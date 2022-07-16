import { useContext, useState } from "react";
import { useCustomizedStyle } from "../style/imageUploader.js";
import CropImage from "./CropImage.jsx";
import ImageManagerContext from "../contexts/index";
import axios from "axios";

const ImageUploader = () => {
  const classes = useCustomizedStyle()();
  const [documentUploaded, setDocumentUploaded] = useState(null);

  const { urlUpload } = useContext(ImageManagerContext);

  const handleChange = (event) => {
    const { target } = event;
    const { files } = target;
    const file = files[0];
    setDocumentUploaded(URL.createObjectURL(file));
  };

  const handleUpload = async (event) => {
    try {
      const resp = await axios.post(urlUpload, "data", "config");
    } catch (e) {
      console.log("Error while uploading picture. Error :", e);
    }
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
// L'image uploader permet d'upload le fichier
// -> permet un override de la config axios
// -> envoie les informations à l'endpoint back
// -> url en props qui recevra l'image avec les data du post
// L'image uploader permet d'executer la fonction de callBack sur succes d'upload
// Le back va recevoir l'image, la découper avec Node et les infos, et la sauvegarder, et renvoyer une 200 (mettre le snippet sur github pour aider)
// On passe sur la gallery (multi/mono select, pagination)
// On peut choisir les modes à activer sur l'image manager

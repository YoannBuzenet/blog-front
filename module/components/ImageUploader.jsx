import { useCustomizedStyle } from "../style/imageUploader.js";

const ImageUploader = () => {
  const classes = useCustomizedStyle()();
  return (
    <>
      <p>Upload screen</p>
      <div>
        <div className={classes.uploadBtnWrapper}>
          <button className={classes.btn}>Upload a file</button>
          <input type="file" name="myfile" />
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
// L'image uploader permet d'afficher le bouton Choisir un fichier
// L'image uploader permet d'afficher le resizer une fois le fichier choisi
// L'image uploader permet d'afficher le bouton Upload
// L'image uploader permet d'executer la fonction de callBack sur succes d'upload

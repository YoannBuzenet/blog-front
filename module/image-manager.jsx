import { useContext } from "react";
import ImageManagerContext from "./contexts/index";
import { customizeStyle } from "./style/react-jss-customization";

// Lui va recevoir masse props overwritable
const ImageManager = () => {
  const { isDisplayedImageManager, setIsDisplayedImageManager } =
    useContext(ImageManagerContext);

  const classes = customizeStyle();

  return (
    <div className={classes.myButton}>
      {isDisplayedImageManager && <p>OK</p>}
      {!isDisplayedImageManager && <p>PAS OK</p>}
    </div>
  );
};

export default ImageManager;
// Fenetre de base avec selecteur Upload / Gallerie
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
// Possibilité d'override les strings affichés dans la librairie
// Mettre un message d'erreur custom si le contexte n'est pas détecté

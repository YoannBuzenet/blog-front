import { useContext } from "react";
import ImageManagerContext from "./contexts/index";
import { useCustomizedStyle } from "./style/react-jss-customization";

// Lui va recevoir masse props overwritable
const ImageManager = () => {
  const { isDisplayedImageManager, setIsDisplayedImageManager } =
    useContext(ImageManagerContext);

  const classes = useCustomizedStyle()();

  console.log("pouet", classes.imageContainer);

  return (
    <div className={classes.imageContainer}>
      {!isDisplayedImageManager && (
        <div className={classes.imageManagerContainer}>LA</div>
      )}
    </div>
  );
};

export default ImageManager;
// Faire marcher le css in js
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

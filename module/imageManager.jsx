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
    <>
      {!isDisplayedImageManager && (
        <div className={classes.imageContainer}>
          <>
            <div className={classes.imageManagerContainer}>
              <p>LA</p>
              <div className={classes.closeButtonContainer}>
                <div
                  onClick={() => setIsDisplayedImageManager(false)}
                  className={classes.closeButton}
                ></div>
              </div>
            </div>
          </>
        </div>
      )}
    </>
  );
};

export default ImageManager;
// Comment intégrer des SVG ou Image ou CSS pour un module qui doit marcher sans webpack ?
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

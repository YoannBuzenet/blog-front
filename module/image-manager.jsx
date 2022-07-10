import { useContext } from "react";
import ImageManagerContext from "./contexts/index";
import { createUseStyles } from "react-jss";

// Lui va recevoir masse props overwritable
const ImageManager = () => {
  const { isDisplayedImageManager, setIsDisplayedImageManager } =
    useContext(ImageManagerContext);

  const useStyles = createUseStyles({
    myButton: {
      color: "green",
      margin: {
        // jss-expand gives more readable syntax
        top: 5, // jss-default-unit makes this 5px
        right: 0,
        bottom: 0,
        left: "1rem",
      },
      "& span": {
        // jss-nested applies this to a child span
        fontWeight: "bold", // jss-camel-case turns this into 'font-weight'
      },
    },
    myLabel: {
      fontStyle: "italic",
    },
  });
  const classes = useStyles();

  return (
    <div className={classes.myButton}>
      {isDisplayedImageManager && <p>OK</p>}
      {!isDisplayedImageManager && <p>PAS OK</p>}
    </div>
  );
};

export default ImageManager;
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
// Mettre un message d'erreur custom si le contexte n'est pas détecté

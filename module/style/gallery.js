import { createUseStyles } from "react-jss";

//TODO : passer tout le customizable en paramètre de la fonction
//TODO chaque parametre doit avoir une valeur par default
export const useCustomizedStyle = () =>
  createUseStyles({
    galleryImageContainer: {
      width: "100%",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "start",
    },
    validationButtonContainer: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      display: "flex",
      "& >div": {
        width: "50%",
      },
      "& >div:first-child": {
        textAlign: "left",
      },
      "& >div:last-child": {
        textAlign: "right",
      },
    },
  });

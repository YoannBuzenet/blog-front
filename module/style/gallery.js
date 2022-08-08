import { createUseStyles } from "react-jss";

//TODO : passer tout le customizable en paramètre de la fonction
//TODO chaque parametre doit avoir une valeur par default
export const useCustomizedStyle = () =>
  createUseStyles({
    galleryContainer: {
      display: "flex",
      flexDirection: "column",
    },
    galleryImageContainer: {
      width: "100%",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "start",
      height: "42%",
      overflowY: "scroll",
    },
    validationButtonContainer: {
      backgroundColor: "rgba(242, 241, 239, 1)",
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

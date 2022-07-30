import { createUseStyles } from "react-jss";

//TODO : passer tout le customizable en paramètre de la fonction
//TODO chaque parametre doit avoir une valeur par default
export const useCustomizedStyle = () =>
  createUseStyles({
    imageContainer: {
      marginLeft: 20,
      maxHeight: 210,
      "& img:hover": {
        cursor: "pointer",
        border: "2px solid black",
      },
      width: 200,
    },
    imageContainerSelected: {
      "& img": {
        border: "2px solid red",
      },
      maxHeight: 210,
      width: 200,
      marginLeft: 20,
      "& img:hover": {
        cursor: "pointer",
      },
    },
    image: {
      maxWidth: "100%",
      maxHeight: "100%",
    },
    lightText: {
      opacity: 0.7,
      fontSize: "12px",
    },
    infoContainer: {
      display: "flex",
      alignItems: "center",
    },
    infoText: {
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
    },
  });

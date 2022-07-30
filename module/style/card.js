import { createUseStyles } from "react-jss";

//TODO : passer tout le customizable en paramètre de la fonction
//TODO chaque parametre doit avoir une valeur par default
export const useCustomizedStyle = () =>
  createUseStyles({
    imageContainer: {
      marginLeft: 20,
      height: 210,
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
      width: 200,
      marginLeft: 20,
      "& img:hover": {
        cursor: "pointer",
      },
    },
    image: {
      width: 200,
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

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
  });

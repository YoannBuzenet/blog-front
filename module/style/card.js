import { createUseStyles } from "react-jss";

//TODO : passer tout le customizable en paramètre de la fonction
//TODO chaque parametre doit avoir une valeur par default
export const useCustomizedStyle = () =>
  createUseStyles({
    imageContainer: { marginLeft: 20, height: 187.5 },
    image: { width: 250 },
  });

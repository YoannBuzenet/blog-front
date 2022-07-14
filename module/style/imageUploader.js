import { createUseStyles } from "react-jss";

//TODO : passer tout le customizable en paramètre de la fonction
//TODO chaque parametre doit avoir une valeur par default
export const useCustomizedStyle = () =>
  createUseStyles({
    uploaded: { height: "10%" },
    nonUploaded: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
    },
  });

import { createUseStyles } from "react-jss";

//TODO : passer tout le customizable en paramètre de la fonction
//TODO chaque parametre doit avoir une valeur par default
export const useCustomizedStyle = () =>
  createUseStyles({
    uploadBtnWrapper: {
      position: "relative",
      overflow: "hidden",
      display: "inline-block",

      "& input[type=file]": {
        fontSize: "100px",
        position: "absolute",
        top: 0,
        left: 0,
        opacity: 0,
      },
      "& ::-webkit-file-upload-button": {
        cursor: "pointer",
      },
    },
    btn: {
      border: "2px solid gray",
      color: "gray",
      backgroundColor: "white",
      padding: "8px 20px",
      borderRadius: "8px",
      padding: "20px",
      fontSize: "20px",
      fontWeight: "bold",
    },
  });

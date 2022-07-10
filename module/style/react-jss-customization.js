import { createUseStyles } from "react-jss";

//TODO : passer tout le customizable en paramètre de la fonction
//TODO chaque parametre doit avoir une valeur par default
//TODO : tout faire passer là dedans ET créer les bonnes sous classes si besoin
export const customizeStyle = () =>
  createUseStyles({
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

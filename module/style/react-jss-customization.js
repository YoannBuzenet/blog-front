import { createUseStyles } from "react-jss";

//TODO : passer tout le customizable en paramètre de la fonction
//TODO chaque parametre doit avoir une valeur par default
//TODO : tout faire passer là dedans ET créer les bonnes sous classes si besoin
export const useCustomizedStyle = () =>
  createUseStyles({
    imageContainer: {
      position: "absolute",
      zIndex: 9999,
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, .4)",

      //   margin: {
      //     // jss-expand gives more readable syntax
      //     top: 5, // jss-default-unit makes this 5px
      //     right: 0,
      //     bottom: 0,
      //     left: "1rem",
      //   },
      //   "& span": {
      //     // jss-nested applies this to a child span
      //     fontWeight: "bold", // jss-camel-case turns this into 'font-weight'
      //   },
    },
    imageManagerContainer: {
      position: "absolute",
      zIndex: 10000,
      width: "70%",
      height: "80%",
      borderRadius: "5px",
      padding: "20px",
      backgroundColor: "red",
    },
    closeButton: {
      position: "absolute",
      right: "32px",
      width: "32px",
      height: "32px",
      opacity: "0.3",
      zIndex: 10001,
      "&:hover": {
        opacity: 1,
      },
      "&:before": {
        position: "absolute",
        left: "15px",
        content: '""',
        height: "33px",
        width: "2px",
        backgroundColor: "black",
        transform: "rotate(45deg)",
      },
      "&:after": {
        position: "absolute",
        left: "15px",
        content: '""',
        height: "33px",
        width: "2px",
        backgroundColor: "black",
        transform: "rotate(-45deg)",
      },
    },
  });

//   .close {
//     position: absolute;
//     right: 32px;
//     top: 32px;
//     width: 32px;
//     height: 32px;
//     opacity: 0.3;
//   }
//   .close:hover {
//     opacity: 1;
//   }
//   .close:before,
//   .close:after {
//     position: absolute;
//     left: 15px;
//     content: " ";
//     height: 33px;
//     width: 2px;
//     background-color: #333;
//   }
//   .close:before {
//     transform: rotate(45deg);
//   }
//   .close:after {
//     transform: rotate(-45deg);
//   }

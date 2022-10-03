import React, { useContext } from "react";
import TransparentDivContext from "../contexts/transparentDiv";
import areFlagsDisplayedContext from "../contexts/areFlagsDisplayed";

const TransparentDiv = () => {
  console.log("JE SUIS LAA");

  //Transparent Div Context
  const { isTransparentDivDisplayed, setIsTransparentDivDisplayed } =
    useContext(TransparentDivContext);
  const { areFlagsDisplayed, setAreFlagsDisplayed } = useContext(
    areFlagsDisplayedContext
  );

  const closeEverything = (event) => {
    setIsTransparentDivDisplayed(false);
    setAreFlagsDisplayed(false);
  };

  return (
    <div className="transparentDiv" onClick={(e) => closeEverything(e)}></div>
  );
};

export default TransparentDiv;

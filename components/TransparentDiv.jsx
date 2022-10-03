import React, { useContext } from "react";
import TransparentDivContext from "../contexts/transparentDiv";
import areFlagsDisplayedContext from "../contexts/areFlagsDisplayed";
import isUserMenuDisplayedContext from "../contexts/userMenu";

const TransparentDiv = () => {
  //Transparent Div Context
  const { isTransparentDivDisplayed, setIsTransparentDivDisplayed } =
    useContext(TransparentDivContext);
  const { areFlagsDisplayed, setAreFlagsDisplayed } = useContext(
    areFlagsDisplayedContext
  );
  const { isUserMenuDisplayed, setIsUserMenuDisplayed } = useContext(
    isUserMenuDisplayedContext
  );

  const closeEverything = (event) => {
    setIsTransparentDivDisplayed(false);
    setAreFlagsDisplayed(false);
    setIsUserMenuDisplayed(false);
  };

  return (
    <div className="transparentDiv" onClick={(e) => closeEverything(e)}></div>
  );
};

export default TransparentDiv;

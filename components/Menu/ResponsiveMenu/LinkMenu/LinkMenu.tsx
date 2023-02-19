"use client";
import { useContext } from "react";
import ResponsiveMenuContext from "../../../../contexts/responsiveMenu";

const LinkMenu = ({ children }) => {
  const { isResponsiveMenuDisplayed, setIsResponsiveMenuDisplayed } =
    useContext(ResponsiveMenuContext);

  return (
    <div onClick={() => setIsResponsiveMenuDisplayed(false)}>{children}</div>
  );
};

export default LinkMenu;

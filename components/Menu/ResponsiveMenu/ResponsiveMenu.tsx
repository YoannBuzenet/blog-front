"use client";

import { useContext } from "react";
import ResponsiveMenuContext from "../../../contexts/responsiveMenu";

const ResponsiveMenu = () => {
  const { isResponsiveMenuDisplayed, setIsResponsiveUserMenuDisplayed } =
    useContext(ResponsiveMenuContext);

  return <>Je suis responsive</>;
};

export default ResponsiveMenu;

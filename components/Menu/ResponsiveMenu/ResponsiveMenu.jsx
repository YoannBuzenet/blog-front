"use client";

import { forwardRef, useContext } from "react";
import ResponsiveMenuContext from "../../../contexts/responsiveMenu";

const ResponsiveMenu = forwardRef(({ props }, ref) => {
  const { isResponsiveMenuDisplayed, setIsResponsiveUserMenuDisplayed } =
    useContext(ResponsiveMenuContext);

  return (
    <div ref={ref}>
      <p>Je suis tout le temps</p>
      {isResponsiveMenuDisplayed && <p>Je suis responsive</p>}
    </div>
  );
});

export default ResponsiveMenu;

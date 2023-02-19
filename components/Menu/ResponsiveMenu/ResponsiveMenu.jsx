"use client";

import { forwardRef, useContext } from "react";
import ResponsiveMenuContext from "../../../contexts/responsiveMenu";
import style from "./ResponsiveMenu.module.scss";
import CloseMenu from "../../../assets/svg/close/outline.svg";
import Link from "next/link";

const ResponsiveMenu = forwardRef(({ props }, ref) => {
  const { isResponsiveMenuDisplayed, setIsResponsiveMenuDisplayed } =
    useContext(ResponsiveMenuContext);

  return (
    <div ref={ref}>
      {isResponsiveMenuDisplayed && (
        <div className={style.container}>
          <div className={`${style.svgContainer}`}>
            <CloseMenu
              className={style.closeSvg}
              title="Fermer"
              onClick={() => setIsResponsiveMenuDisplayed(false)}
            />
          </div>
          <Link
            href={"/"}
            onClick={() => setIsResponsiveMenuDisplayed(false)}
            className={style.link}
          >
            <span className={style.anchorTag}>{"d"}</span>
          </Link>
        </div>
      )}
    </div>
  );
});

export default ResponsiveMenu;

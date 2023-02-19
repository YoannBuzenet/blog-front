"use client";

import { useContext, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import ResponsiveMenu from "./ResponsiveMenu";
import ResponsiveMenuContext from "../../../contexts/responsiveMenu";
import style from "./ResponsiveMenuContainer.module.scss";

const ResponsiveMenuContainer = () => {
  const nodeRef = useRef(null);
  const { isResponsiveMenuDisplayed, setIsResponsiveMenuDisplayed } =
    useContext(ResponsiveMenuContext);

  return (
    <div className={style.container}>
      <CSSTransition
        nodeRef={nodeRef}
        in={isResponsiveMenuDisplayed}
        timeout={200}
        classNames="responsiveMenuTransition"
        unmountOnExit
      >
        <ResponsiveMenu ref={nodeRef} />
      </CSSTransition>
    </div>
  );
};

export default ResponsiveMenuContainer;

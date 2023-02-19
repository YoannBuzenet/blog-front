"use client";

import { useContext, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import ResponsiveMenu from "./ResponsiveMenu";
import ResponsiveMenuContext from "../../../contexts/responsiveMenu";

const ResponsiveMenuContainer = () => {
  const nodeRef = useRef(null);
  const { isResponsiveMenuDisplayed, setIsResponsiveMenuDisplayed } =
    useContext(ResponsiveMenuContext);

  return (
    <>
      <CSSTransition
        nodeRef={nodeRef}
        in={isResponsiveMenuDisplayed}
        timeout={200}
        classNames="menuResponsiveModern"
        unmountOnExit
      >
        <ResponsiveMenu ref={nodeRef} />
      </CSSTransition>
      <div style={{ marginTop: "80px" }}>
        <button onClick={() => setIsResponsiveMenuDisplayed(true)} id="ttt">
          ddddd
        </button>
      </div>
    </>
  );
};

export default ResponsiveMenuContainer;

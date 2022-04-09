import React from "react";
import layoutStyle from "../../../styles/back_office/Layouts/SubLayout.module.css";

const SubLayoutRight = ({ children, CompoToRender, ...props }) => {
  return (
    <div className={layoutStyle.container}>
      <div className={layoutStyle.subLayoutLeft}>{children}</div>
      <div className={layoutStyle.subLayoutRight}>
        <CompoToRender {...props} />
      </div>
    </div>
  );
};

export default SubLayoutRight;

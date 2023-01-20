"use client";

import React from "react";
import layoutStyle from "../../../styles/back_office/layouts/BackOfficeLayout.module.css";
import LeftMenu from "../mainMenu/leftMenu/LeftMenu";
import BackOfficeNavBar from "../mainMenu/NavBar";

const BackOfficeLayout = ({ children }) => {
  return (
    <div className={layoutStyle.globalContainer}>
      <div className={layoutStyle.leftContainer}>
        <LeftMenu />
      </div>
      <div className={layoutStyle.rightContainer}>
        <BackOfficeNavBar />
        <main>{children}</main>
      </div>
    </div>
  );
};

export default BackOfficeLayout;

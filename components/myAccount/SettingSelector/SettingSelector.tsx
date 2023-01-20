"use client";

import { useState } from "react";
import LeftMenu from "../LeftMenu";
import MyAnswers from "../MyAnswers";
import style from "./SettingSelector.module.scss";

const SettingSelector = ({}) => {
  const [selectedMenu, setSelectedMenu] = useState("myAnswers");

  return (
    <>
      <LeftMenu selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />
      <div className={style.rightPartContainer}>
        {selectedMenu === "myAnswers" && <MyAnswers />}
      </div>
    </>
  );
};

export default SettingSelector;
{
}

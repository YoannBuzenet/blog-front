import React from "react";
import Link from "next/link";
import styles from "../../styles/OneLang.module.css";
import CheckIcon from "@material-ui/icons/Check";

const OneLang = ({
  langSelected,
  langName,
  langKey,
  setLangSelected,
  handleClick,
}) => {
  const isSelectedLang = langSelected === langKey;

  const classForElement = isSelectedLang
    ? styles.langIsSelected
    : styles.langIsNotSelected;

  return (
    <li className={classForElement} onClick={(e) => handleClick(e, langKey)}>
      <div className={styles.oneLangLiContainer}>
        <p>{langName}</p>
      </div>
      {isSelectedLang && (
        <div className={styles.iconContainer}>
          <CheckIcon />
        </div>
      )}
    </li>
  );
};

export default OneLang;

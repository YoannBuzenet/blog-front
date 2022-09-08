import React from "react";
import Link from "next/link";
import styles from "../styles/components/LangPicker.module.css";
import OneLang from "./inputLangChoice/OneLang";
import { useIntl } from "react-intl";

const LangPicker = ({
  langSelected,
  setLangSelected,
  setIsDisplayedLangPicker,
}) => {
  const handleClick = (e, lang) => {
    setLangSelected(lang);
  };

  const intl = useIntl();

  const translatedEnglish = intl.formatMessage({
    id: "generic.lang.english",
    defaultMessage: "English",
  });
  const translatedFrench = intl.formatMessage({
    id: "generic.lang.french",
    defaultMessage: "French",
  });

  return (
    <div className={styles.langPickerContainer}>
      <ul>
        <OneLang
          langSelected={langSelected}
          handleClick={handleClick}
          langKey="en-US"
          langName={translatedEnglish}
        />
        <OneLang
          langSelected={langSelected}
          handleClick={handleClick}
          langKey="fr-FR"
          langName={translatedFrench}
        />
      </ul>
    </div>
  );
};

export default LangPicker;

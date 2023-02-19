import React, { useContext } from "react";
import AppCurrentLangContext from "../../contexts/appCurrentLang";
import AreFlagsDisplayedContext from "../../contexts/areFlagsDisplayed";
import transparentDivContext from "../../contexts/transparentDiv";
import { arrayLangsInApp, langInApp } from "../../i18n/allLang";
import { LANGUAGE_SETTINGS_LOCAL_STORAGE } from "../../i18n/consts";
import LinkMenu from "../Menu/ResponsiveMenu/LinkMenu/LinkMenu";
import styles from "./AppLangChoice.module.scss";

const AppLangChoice = ({
  top = "3",
  topArrowMenu = "5",
  marginLeft = "0",
  lineHeightSelectAppLang = "25",
  topSelectAppLangFlags = "22",
}) => {
  const { appCurrentLang, setAppCurrentLang } = useContext(
    AppCurrentLangContext
  );
  const { isTransparentDivDisplayed, setIsTransparentDivDisplayed } =
    useContext(transparentDivContext);

  const { areFlagsDisplayed, setAreFlagsDisplayed } = useContext(
    AreFlagsDisplayedContext
  );

  const handleClick = (event, lang) => {
    setIsTransparentDivDisplayed(false);
    setAppCurrentLang({
      locale: lang?.locale,
      translatedText: lang?.translatedText,
      picture: lang?.picture,
      langID: lang?.langID,
    });

    window.localStorage.setItem(LANGUAGE_SETTINGS_LOCAL_STORAGE, lang?.locale);
  };

  const handleClickDisplayFlags = (event) => {
    setAreFlagsDisplayed(!areFlagsDisplayed);
    setIsTransparentDivDisplayed(!isTransparentDivDisplayed);
  };

  const urlPicture = "/pictures/flags/" + appCurrentLang.picture + ".png";

  // code d'easyflow pas utilisé ici, à voir si on en a besoin si le drapeau a du mal à se rerendre
  // Updating directly the DOM because DOm from SSR can be different from data in memory, and HTML can miss an update sometimes.
  if (typeof window !== "undefined") {
    const urlFlagDOM = window.document.getElementById("currentFlag")?.src;
    if (
      urlFlagDOM !== urlPicture &&
      urlFlagDOM !== null &&
      urlFlagDOM !== undefined
    ) {
      document.getElementById("currentFlag").src = urlPicture;
    }
  }

  return (
    <>
      <div className={styles.currentAppLang}>
        <div
          className={styles.currentLangFlag}
          style={{ top: top + "px", marginLeft: marginLeft + "px" }}
          onClick={(e) => handleClickDisplayFlags(e)}
        >
          <img
            src={urlPicture}
            alt={appCurrentLang.picture + " flag"}
            id="currentFlag"
          />
          <span
            className={styles.arrowMenu}
            style={{ top: topArrowMenu + "px" }}
          ></span>

          {areFlagsDisplayed && (
            <div
              className={styles.setLangChoosing}
              style={{
                lineHeight: lineHeightSelectAppLang + "px",
                top: topSelectAppLangFlags + "px",
              }}
            >
              {arrayLangsInApp.map((lang, index) => (
                <div
                  className={styles.flagDropDown}
                  key={index}
                  onClick={(event) => handleClick(event, lang)}
                >
                  <LinkMenu>
                    <img
                      src={"/pictures/flags/" + lang.picture + ".png"}
                      alt={lang.picture + " flag"}
                    />
                  </LinkMenu>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AppLangChoice;

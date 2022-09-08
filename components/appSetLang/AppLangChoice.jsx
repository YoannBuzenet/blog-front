import React, { useContext, useEffect } from "react";
import AppCurrentLangContext from "../../contexts/appCurrentLang";
import AreFlagsDisplayedContext from "../../contexts/areFlagsDisplayed";
import transparentDivContext from "../../contexts/transparentDiv";
import { arrayLangsInApp, langInApp } from "../../i18n/allLang";
import styles from "../../styles/components/AppLangChoice.module.css";

const AppLangChoice = ({
  top = "3",
  topArrowMenu = "5",
  marginLeft = "0",
  lineHeightSelectAppLang = "25",
  topSelectAppLangFlags = "22",
}) => {
  const { currentLang, setCurrentLang } = useContext(AppCurrentLangContext);
  const { isTransparentDivDisplayed, setIsTransparentDivDisplayed } =
    useContext(transparentDivContext);

  const { areFlagsDisplayed, setAreFlagsDisplayed } = useContext(
    AreFlagsDisplayedContext
  );

  const handleClick = (event, lang) => {
    setIsTransparentDivDisplayed(false);
    setCurrentLang({
      locale: lang?.locale,
      translatedText: lang?.translatedText,
      picture: lang?.picture,
      langID: lang?.langID,
    });
    // setUserContext({ ...userContext, langSelected: lang.locale });
    window.localStorage.setItem("lang", lang?.locale);
  };

  const handleClickDisplayFlags = (event) => {
    setAreFlagsDisplayed(!areFlagsDisplayed);
    setIsTransparentDivDisplayed(!isTransparentDivDisplayed);
  };

  const urlPicture = "/pictures/flags/25X13/" + currentLang.picture + ".png";

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

  useEffect(() => {
    // App Language initialization
    let appInitialLang;
    let langSavedInLocalStorage;

    langSavedInLocalStorage = window.localStorage.getItem("lang");

    if (langSavedInLocalStorage) {
      if (langInApp?.[langSavedInLocalStorage] !== undefined) {
        appInitialLang = langInApp[langSavedInLocalStorage];
      } else {
        appInitialLang = langInApp["en-US"];
      }
    } else {
      appInitialLang = langInApp["en-US"];
    }

    setCurrentLang({ ...appInitialLang });
  }, []);

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
            alt={currentLang.picture + " flag"}
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
                  <img
                    src={"/pictures/flags/25X13/" + lang.picture + ".png"}
                    alt={lang.picture + " flag"}
                  />
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

"use client";

import "../styles/globals.css";
import "../styles/generic/globals.scss";
import "../styles/generic/normalize.css";
import "../styles/generic/wysiwyg.scss";
import "../styles/generic/globals.scss";
import "../styles/generic/globals.scss";
import "../styles/generic/animations.scss";
import "../styles/generic/wysiwyg.scss";
import "../styles/generic/wysiwygDisplay.css";
import "../styles/generic/colors.scss";
import "../styles/generic/buttons.scss";
import "../styles/generic/loaders.css";
import "../styles/generic/transparentDiv.scss";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "@mui/material/styles";
import { customMUITheme } from "../styles/Mui/theme";
import { ToastContainer, toast } from "react-toastify";
import { SessionProvider } from "next-auth/react";
import "../styles/generic/normalize.css";

import { IntlProvider } from "react-intl";
import { langInApp } from "../i18n/allLang";

import "react-image-manager/dist/style.css";
import "react-image-manager/dist/pagination.css";
import "react-image-crop/dist/ReactCrop.css";
import { useEffect, useState } from "react";
import { fetchAllImagesWithPathUpdated } from "../services/api/image";

import UserDataContext from "../contexts/userData";
import AppCurrentLangContext from "../contexts/appCurrentLang";
import UserMenuContext from "../contexts/userMenu";
import AreLangFlagsDisplayedContext from "../contexts/areFlagsDisplayed";
import TransparentDivContext from "../contexts/transparentDiv";
import ResponsiveMenuContext from "../contexts/responsiveMenu";
import { checkLangLocaleStorage } from "../services/i18n";

import { getAllImageTags } from "../services/api/tag";
import TransparentDiv from "../components/TransparentDiv";
import AppWrapper from "../components/AppWrapper/AppWrapper";
import ResponsiveMenuContainer from "../components/Menu/ResponsiveMenu/ResponsiveMenuContainer";
import NavBar from "../components/Menu/Navbar/NavBar";

export function Providers({ langHeaders, children }) {
  const [imagesGallerie, setImagesGallerie] = useState([]);
  const [tags, setTags] = useState([]);
  const [isTransparentDivDisplayed, setIsTransparentDivDisplayed] =
    useState(false);
  const [isUserMenuDisplayed, setIsUserMenuDisplayed] = useState(false);
  const [isResponsiveMenuDisplayed, setIsResponsiveMenuDisplayed] =
    useState(false);

  const [areFlagsDisplayed, setAreFlagsDisplayed] = useState(false);

  const [appCurrentLang, setAppCurrentLang] = useState(langInApp[langHeaders]);

  useEffect(() => {
    // App Language initialization
    // Comparing lang in header VS lang in localStorage
    let appInitialLocale = checkLangLocaleStorage(langInApp, langHeaders);

    if (appInitialLocale.locale !== langHeaders) {
      setAppCurrentLang(langInApp[appInitialLocale.locale]);
    }
  }, []);

  useEffect(() => {
    // fetch images for gallery
    fetchAllImagesWithPathUpdated().then((resp) => {
      setImagesGallerie(resp);
    });

    // fetch tags for gallery
    getAllImageTags(appCurrentLang.locale).then((resp) => {
      // Setting right format to match react-select on react-image-manager
      const tags = resp.map((tag) => {
        return {
          createdAt: tag.createdAt,
          id: tag.id,
          value: tag.id,
          language: tag.language,
          label: tag.name,
          updatedAt: tag.updatedAt,
        };
      });

      setTags(tags);
    });
  }, []);

  const handleSetContextCurrentLang = (currentLang) => {
    if (Object.keys(langInApp).includes(currentLang?.locale)) {
      setAppCurrentLang(currentLang);
    } else {
      setAppCurrentLang(langInApp["en-US"]);
    }
  };

  const contextCurrentLang = {
    appCurrentLang,
    setAppCurrentLang: handleSetContextCurrentLang,
  };
  const contextTransparentDiv = {
    isTransparentDivDisplayed,
    setIsTransparentDivDisplayed,
  };
  const contextFlagsDisplayed = {
    areFlagsDisplayed,
    setAreFlagsDisplayed,
  };
  const contextUserMenuDisplayed = {
    isUserMenuDisplayed,
    setIsUserMenuDisplayed,
  };
  const contextResponsiveMenuMenuDisplayed = {
    isResponsiveMenuDisplayed,
    setIsResponsiveMenuDisplayed,
  };

  return (
    <ThemeProvider theme={customMUITheme}>
      <SessionProvider>
        <UserMenuContext.Provider value={contextUserMenuDisplayed}>
          <ResponsiveMenuContext.Provider
            value={contextResponsiveMenuMenuDisplayed}
          >
            <AppCurrentLangContext.Provider value={contextCurrentLang}>
              <AreLangFlagsDisplayedContext.Provider
                value={contextFlagsDisplayed}
              >
                <TransparentDivContext.Provider value={contextTransparentDiv}>
                  <IntlProvider
                    locale={appCurrentLang?.locale}
                    messages={appCurrentLang?.translatedText}
                  >
                    {isTransparentDivDisplayed && <TransparentDiv />}
                    <ResponsiveMenuContainer />
                    <NavBar />
                    <AppWrapper
                      appCurrentLang={appCurrentLang}
                      setImagesGallerie={setImagesGallerie}
                      imagesGallerie={imagesGallerie}
                      tags={tags}
                    >
                      {children}
                    </AppWrapper>
                    <ToastContainer
                      position={toast.POSITION.TOP_CENTER}
                      autoClose={10000}
                    />
                  </IntlProvider>
                </TransparentDivContext.Provider>
              </AreLangFlagsDisplayedContext.Provider>
            </AppCurrentLangContext.Provider>
          </ResponsiveMenuContext.Provider>
        </UserMenuContext.Provider>
      </SessionProvider>
    </ThemeProvider>
  );
}

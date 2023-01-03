"use client";

import "../styles/globals.css";
import "../styles/generic/globals.scss";
import config from "../config/axios";
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
import {
  langInApp,
  expandLocaleDictionnary,
  localeToLangDictionnary,
} from "../i18n/allLang";

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
import { initializeLang } from "../services/i18n";

import { useRouter } from "next/navigation";
import { getAllTags } from "../services/api/tag";
import TransparentDiv from "../components/TransparentDiv";
import AppWrapper from "../components/AppWrapper/AppWrapper";

export function Providers({ children }) {
  console.log(
    `Booting app - Back-end API URL is ${process.env.NEXT_PUBLIC_API_URL}`
  );
  const router = useRouter();

  const [imagesGallerie, setImagesGallerie] = useState([]);
  const [tags, setTags] = useState([]);
  const [isTransparentDivDisplayed, setIsTransparentDivDisplayed] =
    useState(false);
  const [isUserMenuDisplayed, setIsUserMenuDisplayed] = useState(false);
  const [areFlagsDisplayed, setAreFlagsDisplayed] = useState(false);

  // App Language initialization
  let appInitialLang = initializeLang(langInApp);

  //TODO get la locale

  console.log("-------", router);
  const completeLocaleFromRouter = expandLocaleDictionnary[router.locale];

  // Booting on next router language, server side
  // We will adjust client side by watching local storage
  const [appCurrentLang, setAppCurrentLang] = useState(
    langInApp[completeLocaleFromRouter]
  );

  useEffect(() => {
    // fetch images for gallery
    fetchAllImagesWithPathUpdated().then((resp) => {
      setImagesGallerie(resp);
    });

    // fetch tags for gallery
    getAllTags(appCurrentLang.locale).then((resp) => {
      setTags(resp);
    });

    // Loading saved settings by user
    if (appInitialLang.locale !== appCurrentLang.locale) {
      setAppCurrentLang(appInitialLang);
    }
  }, []);

  const handleSetContextCurrentLang = (currentLang) => {
    if (Object.keys(langInApp).includes(currentLang?.locale)) {
      setAppCurrentLang(currentLang);
      // if (router.pathname === "/") {
      //   router.push(router.pathname, router.pathname, {
      //     locale: localeToLangDictionnary[currentLang.locale],
      //   });
      // }
    } else {
      setAppCurrentLang(langInApp["en-US"]);
      // if (router.pathname === "/") {
      //   router.push(router.pathname, router.pathname, { locale: "en" });
      // }
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

  return (
    <ThemeProvider theme={customMUITheme}>
      {/* <SessionProvider session={session}> */}
      <UserMenuContext.Provider value={contextUserMenuDisplayed}>
        <AppCurrentLangContext.Provider value={contextCurrentLang}>
          <AreLangFlagsDisplayedContext.Provider value={contextFlagsDisplayed}>
            <TransparentDivContext.Provider value={contextTransparentDiv}>
              <IntlProvider
                locale={appCurrentLang.locale}
                messages={appCurrentLang.translatedText}
              >
                {isTransparentDivDisplayed && <TransparentDiv />}
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
      </UserMenuContext.Provider>
      {/* </SessionProvider> */}
    </ThemeProvider>
  );
}

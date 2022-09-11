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
import "../styles/generic/loaders.css";
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
import { ImageManagerContainer } from "react-image-manager";
import { useContext, useEffect, useState } from "react";
import { fetchAllImagesWithPathUpdated } from "../services/api/image";

import UserDataContext from "../contexts/userData";
import AppCurrentLangContext from "../contexts/appCurrentLang";
import AreLangFlagsDisplayedContext from "../contexts/areFlagsDisplayed";
import TransparentDivContext from "../contexts/transparentDiv";
import { initializeLang } from "../services/i18n";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  console.log(
    `Booting app - Back-end API URL is ${process.env.NEXT_PUBLIC_API_URL}`
  );

  const [imagesGallerie, setImagesGallerie] = useState([]);
  const [isTransparentDivDisplayed, setIsTransparentDivDisplayed] =
    useState(false);
  const [areFlagsDisplayed, setAreFlagsDisplayed] = useState(false);

  useEffect(() => {
    // fetch images for gallerie
    fetchAllImagesWithPathUpdated().then((resp) => {
      setImagesGallerie(resp);
    });
  }, []);

  // App Language initialization
  let appInitialLang = initializeLang(langInApp);
  const [appCurrentLang, setAppCurrentLang] = useState(langInApp["en-US"]);
  useEffect(() => {
    setAppCurrentLang(appInitialLang);
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

  return (
    <ImageManagerContainer
      cropAspectRatio={2}
      urlUpload={`${process.env.NEXT_PUBLIC_API_URL}/api/entities/images`}
      minWidthImageUpload={700}
      enabledModes={["gallery", "upload"]}
      imageFields={[
        {
          name: "name",
          isRequired: true,
        },
        {
          name: "credits",
        },
      ]}
      onSuccessUpload={() => {
        toast.success(<p>L&apos;image a bien été uploadée.</p>);
        // Maj Gallerie
        fetchAllImagesWithPathUpdated().then((resp) => {
          setImagesGallerie(resp);
        });
      }}
      onFailureupload={() =>
        toast.error(<p>L&apos;image a bien n&apos;a pu être uploadée.</p>)
      }
      onSelectImages={(arrayOfSelectedImages) => {}}
      galleryImages={imagesGallerie}
    >
      <ThemeProvider theme={customMUITheme}>
        <SessionProvider session={session}>
          <AppCurrentLangContext.Provider value={contextCurrentLang}>
            <AreLangFlagsDisplayedContext.Provider
              value={contextFlagsDisplayed}
            >
              <TransparentDivContext.Provider value={contextTransparentDiv}>
                <IntlProvider
                  locale={appCurrentLang.locale}
                  messages={appCurrentLang.translatedText}
                >
                  <Component {...pageProps} />
                  <ToastContainer
                    position={toast.POSITION.TOP_CENTER}
                    autoClose={10000}
                  />
                </IntlProvider>
              </TransparentDivContext.Provider>
            </AreLangFlagsDisplayedContext.Provider>
          </AppCurrentLangContext.Provider>
        </SessionProvider>
      </ThemeProvider>
    </ImageManagerContainer>
  );
}

export default MyApp;

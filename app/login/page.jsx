import { useSession, signIn } from "next-auth/react";
// import { useEffect, useState, useContext } from "react";
import NavBar from "../../components/Navbar/NavBar";
import { getAllImages } from "../../services/api/image";
import style from "../../styles/pages/Login.module.css";
// import appCurrentLangContext from "../../contexts/appCurrentLang";
import { FormattedMessage } from "react-intl";
// import { useTranslation } from "../../i18n/hooks";
import GoogleIcon from "../../assets/icons/google.svg";
import IntlLangWrapper from "../../components/IntlLangWrapper/IntlLangWrapper";
import { headers } from "next/headers";

export default async function LoginPage() {
  //TODO refacto avec app/page.jsx, code dupliqué lulz
  const headersList = headers();
  const acceptLanguageHeader = headersList.get("accept-language");
  let localeBrowser = "en-US";

  if (acceptLanguageHeader !== undefined) {
    const allLanguages = acceptLanguageHeader.split(";");
    const mainLanguageLocaleAndLanguage = allLanguages[0];
    const [locale, language] = mainLanguageLocaleAndLanguage.split(",");
    localeBrowser = locale;
  }
  const images = await getAllImages("createdAt", null, "Banner", localeBrowser);

  console.log("dude", images);

  // const { t } = useTranslation();

  // Checking if lang in client side is the same as perceived in the router from headers.
  // If not, we refetch the images from the right language here
  // useEffect(() => {
  //   const currentLangImages = images?.[0]?.language;
  //   if (currentLangImages && currentLangImages !== appCurrentLang.locale) {
  //     getAllImages("createdAt", null, "Banner", appCurrentLang.locale).then(
  //       (images) => {
  //         setImagesDisplayed(images);
  //       }
  //     );
  //   }
  // }, [appCurrentLang.locale]);

  const handleGoogleClick = async (e) => {
    e.preventDefault();
    signIn("google", {
      callbackUrl: `/`,
    });
  };

  // console.log("imagesDisplayed", imagesDisplayed);

  return (
    <>
      <NavBar />
      <div className={style.container}>
        <div className={style.doubleDivContainer}>
          <div className={style.leftDiv}>
            <div>
              <div className={style.vAlign}>
                <button
                  // onClick={handleGoogleClick}
                  className="CTAButton"
                >
                  <div>
                    {/* <GoogleIcon
                      title={t("generic.connect.google", "Connect With Google")}
                    /> */}
                    <p>
                      <IntlLangWrapper
                        translationKey={"page.login.button.login"}
                        defaultMessage="Login / Register"
                      />
                    </p>
                  </div>
                </button>
                <div>
                  <p className={style.subTitle}>
                    <IntlLangWrapper
                      translationKey={"page.login.disclaimer"}
                      defaultMessage="You can change then nickname and avatar appearing online."
                    />
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className={style.rightDiv}>
            <div>
              <div>{<img src={images?.[0]?.path} />}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// import { useEffect, useState, useContext } from "react";
import NavBar from "../../components/Menu/Navbar/NavBar";
import { getAllImages } from "../../services/api/image";
import style from "../../styles/pages/Login.module.css";
// import appCurrentLangContext from "../../contexts/appCurrentLang";
import { FormattedMessage } from "react-intl";
import GoogleIcon from "../../assets/icons/google.svg";
import IntlLangWrapper from "../../components/IntlLangWrapper/IntlLangWrapper";
import { headers } from "next/headers";
import LoginButton from "./LoginButton";

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

  return (
    <>
      <NavBar />
      <div className={style.container}>
        <div className={style.doubleDivContainer}>
          <div className={style.leftDiv}>
            <div>
              <div className={style.vAlign}>
                <LoginButton />
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

import Link from "next/link";
import style from "../../styles/components/NavBar/NavBar.module.css";
import { FormattedMessage } from "react-intl";
import AppLangChoice from "../appSetLang/AppLangChoice";
import React from "react";
import LoginIcon from "../../assets/svg/login/round.svg";
import { useIntl } from "react-intl";
import { useTranslation } from "../../i18n/hooks";
import { useSession } from "next-auth/react";

const NavBar = () => {
  const { t } = useTranslation();
  const { data, status } = useSession();

  console.log("data", data);
  console.log("status", status);

  const isUserAuthenTicated = status === "authenticated";

  return (
    <div className={style.navBarContainer}>
      <div className={`${style.navBarDisplay} container`}>
        <div>
          <p>
            <Link href="/" passHref>
              <a>
                <FormattedMessage
                  id="navbar.button.home"
                  defaultMessage="Home"
                />
              </a>
            </Link>
          </p>
        </div>
        <div className={style.rightPart}>
          {!isUserAuthenTicated && (
            <>
              <Link href="/login" passHref>
                <a>
                  <LoginIcon
                    className="svg"
                    title={t("navbar.button.login", "Login")}
                  />
                </a>
              </Link>
            </>
          )}
          {isUserAuthenTicated && (
            <div className={style.userMenuAccess}>
              <p>{data.user.firstName}</p>
            </div>
          )}
          <AppLangChoice top="-6" marginLeft="20" />
        </div>
      </div>
    </div>
  );
};

export default NavBar;

import Link from "next/link";
import style from "../../styles/components/NavBar/NavBar.module.css";
import { FormattedMessage } from "react-intl";
import AppLangChoice from "../appSetLang/AppLangChoice";
import React from "react";
import LoginIcon from "../../assets/svg/login/round.svg";
import { useIntl } from "react-intl";
import { useTranslation } from "../../i18n/hooks";

const NavBar = () => {
  const { t } = useTranslation();

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
          <Link href="/login" passHref>
            <a>
              <LoginIcon
                className="svg"
                title={t("navbar.button.login", "Login")}
              />
            </a>
          </Link>
          <AppLangChoice top="-6" marginLeft="20" />
        </div>
      </div>
    </div>
  );
};

export default NavBar;

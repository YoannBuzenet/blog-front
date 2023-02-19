"use client";
import { useContext } from "react";
import Link from "next/link";
import style from "./NavBar.module.css";
import { FormattedMessage } from "react-intl";
import AppLangChoice from "../../appSetLang/AppLangChoice";
import React from "react";
import LoginIcon from "../../../assets/svg/login/round.svg";
import { useTranslation } from "../../../i18n/hooks";
import { useSession } from "next-auth/react";
import isUserMenuDisplayedContext from "../../../contexts/userMenu";
import isTransparentDisplayedContext from "../../../contexts/transparentDiv";
import UserMenu from "./UserMenu";
import ResponsiveMenuContext from "../../../contexts/responsiveMenu";

const NavBar = () => {
  const { t } = useTranslation();
  const { data, status } = useSession();

  const isUserAuthenTicated = status === "authenticated";

  const { isUserMenuDisplayed, setIsUserMenuDisplayed } = useContext(
    isUserMenuDisplayedContext
  );
  const { isTransparentDivDisplayed, setIsTransparentDivDisplayed } =
    useContext(isTransparentDisplayedContext);

  const handleDisplayUserMenu = () => {
    setIsTransparentDivDisplayed(true);
    setIsUserMenuDisplayed(!isUserMenuDisplayed);
  };

  const { isResponsiveMenuDisplayed, setIsResponsiveMenuDisplayed } =
    useContext(ResponsiveMenuContext);

  //   <button onClick={() => setIsResponsiveMenuDisplayed(true)} id="ttt">
  //   ddddd
  // </button>

  return (
    <div className={style.navBarContainer}>
      <div className={`${style.navBarDisplay} container`}>
        <div>
          <Link href="/" passHref>
            <p className={`${style.homeButton} clickable`}>
              <FormattedMessage id="navbar.button.home" defaultMessage="Home" />
            </p>
          </Link>
        </div>
        <div className={style.rightPart}>
          {!isUserAuthenTicated && (
            <>
              <Link href="/login" passHref>
                <LoginIcon
                  className="svg"
                  title={t("navbar.button.login", "Login")}
                />
              </Link>
            </>
          )}
          {isUserAuthenTicated && (
            <div className={`clickable noselect`}>
              <div
                className={style.userMenuAccess}
                onClick={handleDisplayUserMenu}
              >
                <p>{data?.user?.firstName}</p>
              </div>
              {isUserMenuDisplayed && <UserMenu />}
            </div>
          )}
          <AppLangChoice top="-6" marginLeft="20" />
        </div>
      </div>
    </div>
  );
};

export default NavBar;

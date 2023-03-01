"use client";

import { forwardRef, useContext } from "react";
import ResponsiveMenuContext from "../../../contexts/responsiveMenu";
import style from "./ResponsiveMenu.module.scss";
import CloseMenu from "../../../assets/svg/close/outline.svg";
import Link from "next/link";
import { useSession } from "next-auth/react";
import LoginIcon from "../../../assets/svg/login/round.svg";
import { useTranslation } from "../../../i18n/hooks";
import AppLangChoice from "../../appSetLang/AppLangChoice";
import UserMenu from "../Navbar/UserMenu";
import LinkMenu from "./LinkMenu/LinkMenu";

const ResponsiveMenu = forwardRef(({ props }, ref) => {
  const { isResponsiveMenuDisplayed, setIsResponsiveMenuDisplayed } =
    useContext(ResponsiveMenuContext);

  const { data, status } = useSession();
  const { t } = useTranslation();

  const isUserAuthenTicated = status === "authenticated";

  return (
    <div ref={ref}>
      {isResponsiveMenuDisplayed && (
        <div className={style.container}>
          <div className={`${style.svgContainer}`}>
            <CloseMenu
              className={style.closeSvg}
              title="Fermer"
              onClick={() => setIsResponsiveMenuDisplayed(false)}
            />
          </div>

          <div className={style.menuLinkContainer}>
            {!isUserAuthenTicated && (
              <LinkMenu>
                <div>
                  <Link href="/login" passHref>
                    <LoginIcon
                      className="svg"
                      title={t("navbar.button.login", "Login")}
                    />
                  </Link>
                </div>
              </LinkMenu>
            )}
            {isUserAuthenTicated && (
              <LinkMenu>
                <div className={`clickable noselect`}>
                  <div
                    className={style.userMenuAccess}
                    onClick={handleDisplayUserMenu}
                  >
                    <p>{data?.user?.firstName}</p>
                  </div>
                  {isUserMenuDisplayed && <UserMenu />}
                </div>
              </LinkMenu>
            )}
            <div onClick={() => setIsResponsiveMenuDisplayed(false)}>
              <Link href={"/posts/search"}>
                <p>Recherche</p>
              </Link>
            </div>
            <div
              style={{ position: "relative", width: "100%", height: "20px" }}
            >
              <AppLangChoice marginLeft="-75" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

export default ResponsiveMenu;

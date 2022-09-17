import Link from "next/link";
import style from "../../styles/components/NavBar/NavBar.module.css";
import { FormattedMessage } from "react-intl";
import AppLangChoice from "../appSetLang/AppLangChoice";
import React from "react";
import LoginIcon from "../../assets/svg/login/round.svg";

const NavBar = () => {
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
              <LoginIcon className="svg" title="ok" />
            </a>
          </Link>
          <AppLangChoice top="-6" marginLeft="20" />
        </div>
      </div>
    </div>
  );
};

export default NavBar;

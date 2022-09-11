import Link from "next/link";
import style from "../../styles/components/NavBar/NavBar.module.css";
import { FormattedMessage } from "react-intl";
import AppLangChoice from "../appSetLang/AppLangChoice";
import React from "react";

const NavBar = () => {
  const Ok = React.forwardRef(function FormattedMessage(props, ref) {
    return (
      <FormattedMessage
        id="navbar.button.home"
        defaultMessage="Home"
        ref={ref}
      />
    );
  });

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
          <p>Menu</p>
          <AppLangChoice top="-6" marginLeft="20" />
        </div>
      </div>
    </div>
  );
};

export default NavBar;

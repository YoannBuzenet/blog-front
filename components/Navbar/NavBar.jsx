import Link from "next/link";
import style from "../../styles/components/NavBar/NavBar.module.css";
import { FormattedMessage } from "react-intl";

const NavBar = () => {
  return (
    <div className={style.navBarContainer}>
      <div className={`${style.navBarDisplay} container`}>
        <div>
          <p>
            <Link href="/">
              <FormattedMessage id="navbar.button.home" defaultMessage="Home" />
            </Link>
          </p>
        </div>
        <div className={style.rightPart}>
          <p>Menu</p>
        </div>
      </div>
    </div>
  );
};

export default NavBar;

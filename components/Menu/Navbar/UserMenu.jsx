import style from "./UserMenu.module.css";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useContext } from "react";
import isUserMenuDisplayedContext from "../../../contexts/userMenu";
import transparentDivContext from "../../../contexts/transparentDiv";
import { FormattedMessage } from "react-intl";

const UserMenu = () => {
  const { isUserMenuDisplayed, setIsUserMenuDisplayed } = useContext(
    isUserMenuDisplayedContext
  );
  const { setIsTransparentDivDisplayed } = useContext(transparentDivContext);

  const closeMenu = () => {
    setIsUserMenuDisplayed(false);
    setIsTransparentDivDisplayed(false);
  };

  return (
    <div className={style.container}>
      <Link href={"/myAccount"} passHref>
        <p
          className={`${style.menuLine} clickable`}
          onClick={() => {
            closeMenu();
          }}
        >
          <FormattedMessage
            id="navbar.userMenu.profile"
            defaultMessage="Profile"
          />
        </p>
      </Link>
      <p
        className={`${style.menuLine} clickable`}
        onClick={() => {
          closeMenu();
          signOut();
        }}
      >
        <FormattedMessage
          id="navbar.userMenu.logout"
          defaultMessage="Log out"
        />
      </p>
    </div>
  );
};

export default UserMenu;

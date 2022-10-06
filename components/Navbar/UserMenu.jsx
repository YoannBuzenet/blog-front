import style from "../../styles/components/NavBar/UserMenu.module.css";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useContext } from "react";
import isUserMenuDisplayedContext from "../../contexts/userMenu";
import { FormattedMessage } from "react-intl";

const UserMenu = () => {
  const { isUserMenuDisplayed, setIsUserMenuDisplayed } = useContext(
    isUserMenuDisplayedContext
  );

  const closeMenu = () => {
    setIsUserMenuDisplayed(false);
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
          <a>
            <FormattedMessage
              id="navbar.userMenu.profile"
              defaultMessage="Profile"
            />
          </a>
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

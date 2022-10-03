import style from "../../styles/components/NavBar/UserMenu.module.css";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useContext } from "react";
import isUserMenuDisplayedContext from "../../contexts/userMenu";

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
          className={style.menuLine}
          onClick={() => {
            closeMenu();
          }}
        >
          <a>Settings</a>
        </p>
      </Link>
      <p
        className={style.menuLine}
        onClick={() => {
          closeMenu();
          signOut();
        }}
      >
        Log out
      </p>
    </div>
  );
};

export default UserMenu;

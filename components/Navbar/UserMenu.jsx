import style from "../../styles/components/NavBar/UserMenu.module.css";
import { signOut } from "next-auth/react";

const UserMenu = () => {
  return (
    <div className={style.container}>
      <p className={style.menuLine}>Settings</p>
      <p className={style.menuLine} onClick={() => signOut()}>
        Log out
      </p>
    </div>
  );
};

export default UserMenu;

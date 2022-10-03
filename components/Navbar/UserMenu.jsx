import style from "../../styles/components/NavBar/UserMenu.module.css";

const UserMenu = () => {
  return (
    <div className={style.container}>
      <p className={style.menuLine}>Settings</p>
      <p className={style.menuLine}>Log out</p>
    </div>
  );
};

export default UserMenu;

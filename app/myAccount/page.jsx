import style from "../../styles/pages/myAccount/MyAccount.module.css";
import SettingSelector from "../../components/myAccount/SettingSelector/SettingSelector";
import NavBar from "../../components/Navbar/NavBar";
const MyAccount = () => {
  return (
    <div className={`${style.container} container`}>
      <NavBar />
      <div className={style.menuContainer}>
        <SettingSelector />
      </div>
    </div>
  );
};

export default MyAccount;

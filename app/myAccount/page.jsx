import style from "../../styles/pages/myAccount/MyAccount.module.css";
import SettingSelector from "../../components/myAccount/SettingSelector/SettingSelector";
const MyAccount = () => {
  return (
    <div className={`${style.container} container`}>
      <div className={style.menuContainer}>
        <SettingSelector />
      </div>
    </div>
  );
};

export default MyAccount;

import style from "../styles/pages/myAccount/MyAccount.module.css";
import NavBar from "../components/Navbar/NavBar";
import LeftMenu from "../components/myAccount/LeftMenu";

const MyAccount = () => {
  return (
    <div className={`${style.container} container`}>
      <NavBar />
      <div className={style.menuContainer}>
        <LeftMenu />
        <div>
          <p>Right Screen</p>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;

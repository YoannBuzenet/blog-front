import style from "../styles/pages/myAccount/MyAccount.module.css";
import NavBar from "../components/Navbar/NavBar";
import LeftMenu from "../components/myAccount/LeftMenu";
import { useState } from "react";
import MyAnswers from "../components/myAccount/MyAnswers";

const MyAccount = () => {
  // Garder en state quel menu est cliqué
  // LeftMenu doit avoir accès à l'information
  // A droite, un ecran par type de contenu

  const [selectedMenu, setSelectedMenu] = useState("myAnswers");

  return (
    <div className={`${style.container} container`}>
      <NavBar />
      <div className={style.menuContainer}>
        <LeftMenu
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
        />
        <div className={style.rightPartContainer}>
          {selectedMenu === "myAnswers" && <MyAnswers />}
        </div>
      </div>
    </div>
  );
};

export default MyAccount;

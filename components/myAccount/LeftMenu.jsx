import style from "../../styles/pages/myAccount/LeftMenu.module.css";

const LeftMenu = ({ selectedMenu, setSelectedMenu }) => {
  return (
    <div className={style.container}>
      <h2 className={`h2`}>Profile</h2>
      <p
        className={`clickable ${style.menuLine} ${
          selectedMenu === "myAnswers" ? style.selected : ""
        }`}
        onClick={(e) => setSelectedMenu("myAnswers")}
      >
        My answers
      </p>
    </div>
  );
};

export default LeftMenu;

import MenuElement from "./MenuElement";
import leftMenuStyle from "../../../../styles/back_office/menu/leftMenu/LeftMenu.module.css";
import MessageIcon from "../../../../assets/svg/message/round.svg";

const LeftMenu = () => {
  return (
    <div className={leftMenuStyle.leftMenuBackground}>
      <div className={leftMenuStyle.logoTop}></div>
      <MenuElement SvgIcon={MessageIcon} url="/gestion" name="Général" />
      <MenuElement
        SvgIcon={MessageIcon}
        url="/gestion/pages"
        name="Les pages"
      />
      <MenuElement SvgIcon={MessageIcon} url="/gestion/design" name="Design" />
    </div>
  );
};

export default LeftMenu;

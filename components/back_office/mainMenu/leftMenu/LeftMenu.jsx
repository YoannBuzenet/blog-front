import MenuElement from "./MenuElement";
import leftMenuStyle from "../../../../styles/back_office/menu/leftMenu/LeftMenu.module.css";
import MessageIcon from "../../../../assets/svg/message/round.svg";
import TagIcon from "../../../../assets/svg/tag/round.svg";

const LeftMenu = () => {
  return (
    <div className={leftMenuStyle.leftMenuBackground}>
      <div className={leftMenuStyle.logoTop}></div>
      <MenuElement
        SvgIcon={MessageIcon}
        url="/manage/posts/list"
        name="Les posts"
      />
      <MenuElement SvgIcon={TagIcon} url="/manage/tags" name="Tags" />
    </div>
  );
};

export default LeftMenu;

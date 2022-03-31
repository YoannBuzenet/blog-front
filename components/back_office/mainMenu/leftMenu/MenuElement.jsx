import elementStyle from "../../../../styles/back_office/menu/leftMenu/MenuElement.module.scss";
import Link from "next/link";

const MenuElement = ({ isActive = true, SvgIcon, url, name }) => {
  return (
    <Link href={url}>
      <div
        className={`${elementStyle.elementContainer} ${
          isActive ? "activeMenu" : ""
        }`}
      >
        <SvgIcon className="svg" />
        <span>{name}</span>
      </div>
    </Link>
  );
};

export default MenuElement;

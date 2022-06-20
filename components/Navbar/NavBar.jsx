import style from "../../styles/components/NavBar/NavBar.module.css";

const NavBar = () => {
  return (
    <div className={style.navBarContainer}>
      <div className={style.navBarDisplay}>
        <div>
          <p>Navbar</p>
        </div>
        <div className={style.rightPart}>
          <p>Menu</p>
        </div>
      </div>
    </div>
  );
};

export default NavBar;

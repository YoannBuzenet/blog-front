"use client";
import style from "./Footer.module.scss";

const Footer = () => {
  return (
    <div className={`${style.footer}`}>
      <div className={`${style.footerContent} container`}>
        <div
          className={`h3 ${style.footerContent__section} ${style.footerContent__firstColumn}`}
        >
          <h3>General</h3>
          <p>© Rights</p>
        </div>
        <div className={`h3 ${style.footerContent__section}`}>
          <h3>About</h3>
          <p>General</p>
          <p>Rights</p>
        </div>
        <div className={`h3 ${style.footerContent__section}`}>
          <h3>Resources</h3>
          <p>General</p>
          <p>Rights</p>
        </div>
        <div
          className={`h3 ${style.footerContent__section} ${style.footerContent__lastColumn}`}
        >
          <h3>Social</h3>
          <p>General</p>
          <p>Rights</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;

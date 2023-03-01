"use client";
import Link from "next/link";
import style from "./Footer.module.scss";

const Footer = () => {
  return (
    <div className={`${style.footer}`}>
      <div className={`${style.footerContent} container`}>
        <div
          className={`h3 ${style.footerContent__section} ${style.footerContent__firstColumn}`}
        >
          <h3>General</h3>
          <div className={`h3 ${style.footerContent__section__content}`}>
            <p>© Rights</p>
          </div>
        </div>
        <div className={`h3 ${style.footerContent__section}`}>
          <h3>About</h3>
          <div className={`h3 ${style.footerContent__section__content}`}>
            <p>General</p>
            <p>Rights</p>
          </div>
        </div>
        <div className={`h3 ${style.footerContent__section}`}>
          <h3>Resources</h3>
          <div className={`h3 ${style.footerContent__section__content}`}>
            <Link href={"/posts/search"}>
              <p>Recherche</p>
            </Link>
            <p>Rights</p>
          </div>
        </div>
        <div
          className={`h3 ${style.footerContent__section} ${style.footerContent__lastColumn}`}
        >
          <h3>Social</h3>
          <div className={`h3 ${style.footerContent__section__content}`}>
            <p>General</p>
            <p>Rights</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

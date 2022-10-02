import { useSession, signIn } from "next-auth/react";
import { useEffect, useState, useContext } from "react";
import NavBar from "../components/Navbar/NavBar";
import { getAllImages } from "../services/api/image";
import style from "../styles/pages/Login.module.css";
import appCurrentLangContext from "../contexts/appCurrentLang";

export async function getServerSideProps({ req }) {
  const headersAcceptLanguages = req?.headers?.["accept-language"];

  let localeBrowser = "en-US";

  if (headersAcceptLanguages !== undefined) {
    const allLanguages = headersAcceptLanguages.split(";");
    const mainLanguageLocaleAndLanguage = allLanguages[0];
    const [locale, language] = mainLanguageLocaleAndLanguage.split(",");
    localeBrowser = locale;
  }

  const resp = await getAllImages("createdAt", null, "Banner", localeBrowser);

  return { props: { images: resp } };
}

const LoginPage = ({ images }) => {
  const [imagesDisplayed, setImagesDisplayed] = useState(images);
  const { appCurrentLang } = useContext(appCurrentLangContext);

  // Checking if lang in client side is the same as perceived in the router from headers.
  // If not, we refetch the images from the right language here
  useEffect(() => {
    const currentLangImages = images?.[0]?.language;
    if (currentLangImages && currentLangImages !== appCurrentLang.locale) {
      getAllImages("createdAt", null, "Banner", appCurrentLang.locale).then(
        (images) => {
          setImagesDisplayed(images);
        }
      );
    }
  }, [appCurrentLang.locale]);

  const handleGoogleClick = (e) => {
    e.preventDefault();
    signIn("google", {
      callbackUrl: `/`,
    });
  };

  console.log("images from props", images);
  console.log("imagesDisplayed", imagesDisplayed);

  return (
    <>
      <NavBar />
      <div className={style.container}>
        Login bro
        <button onClick={handleGoogleClick}>Login test</button>
      </div>
    </>
  );
};

export default LoginPage;

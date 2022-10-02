import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";
import NavBar from "../components/Navbar/NavBar";
import { getAllImages } from "../services/api/image";
import style from "../styles/pages/Login.module.css";

export async function getServerSideProps({ req }) {
  const headersAcceptLanguages = req?.headers?.["accept-language"];

  let localeBrowser = "en-US";

  if (headersAcceptLanguages !== undefined) {
    const allLanguages = headersAcceptLanguages.split(";");
    const mainLanguageLocaleAndLanguage = allLanguages[0];
    const [locale, language] = mainLanguageLocaleAndLanguage.split(",");
    localeBrowser = locale;
  }

  const resp = await getAllImages("createdAt", null, "banner", localeBrowser);
  // const resp = await getAllImages(localeBrowser);

  return { props: { images: resp } };
}

const LoginPage = ({ images }) => {
  // On reload les images dans la bonne langue si ce n'est pas celle client-side

  const handleGoogleClick = (e) => {
    e.preventDefault();
    signIn("google", {
      callbackUrl: `/`,
    });
  };

  console.log("images from props", images);

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

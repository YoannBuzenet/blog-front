import Head from "next/head";
import Footer from "../components/Footer/Footer";
import NavBar from "../components/Menu/Navbar/NavBar";
import HomePostsDisplay from "../components/posts/HomePostsDisplay";
import { getAllPosts } from "../services/api/post";
import { headers } from "next/headers";
import ResponsiveMenu from "../components/Menu/ResponsiveMenu/ResponsiveMenu";
import ResponsiveMenuContainer from "../components/Menu/ResponsiveMenu/ResponsiveMenuContainer";

export default async function Page() {
  const headersList = headers();
  const acceptLanguageHeader = headersList.get("accept-language");
  let localeBrowser = "en-US";

  if (acceptLanguageHeader !== undefined) {
    const allLanguages = acceptLanguageHeader.split(";");
    const mainLanguageLocaleAndLanguage = allLanguages[0];
    const [locale, language] = mainLanguageLocaleAndLanguage.split(",");
    localeBrowser = locale;
  }

  const posts = await getAllPosts(localeBrowser);

  return (
    <>
      <div className="container">
        <Head>
          <title>Le blog</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <ResponsiveMenuContainer />

        <NavBar />

        <main className="main belowNavbar">
          <HomePostsDisplay posts={posts} />
        </main>
      </div>
      <Footer />
    </>
  );
}

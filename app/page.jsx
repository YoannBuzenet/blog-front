import Footer from "../components/Footer/Footer";
import HomePostsDisplay from "../components/posts/HomePostsDisplay";
import { getAllPosts } from "../services/api/post";
import { headers } from "next/headers";

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
        <main className="main belowNavbar">
          <HomePostsDisplay posts={posts} />
        </main>
      </div>
      <Footer />
    </>
  );
}

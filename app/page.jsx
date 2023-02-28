import Footer from "../components/Footer/Footer";
import HomePostsDisplay from "../components/posts/HomePostsDisplay";
import { getAllPosts } from "../services/api/post";
import { headers } from "next/headers";
import { getLangFromHeaders } from "../services/i18n";

export default async function Page() {
  const localeBrowser = getLangFromHeaders(headers);

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

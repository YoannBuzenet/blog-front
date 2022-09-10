import Head from "next/head";
import Footer from "../components/Footer/Footer";
import NavBar from "../components/Navbar/NavBar";
import HomePostsDisplay from "../components/posts/HomePostsDisplay";
import PostPeek from "../components/posts/PostPeek";
import { getAllPosts } from "../services/api/post";
import styles from "../styles/Home.module.css";

export async function getServerSideProps({ req }) {
  const resp = await getAllPosts();
  // getAllPosts doit fetch les articles dans la bonne langue

  return { props: { posts: resp } };
}

export default function Home({ posts }) {
  // useEffect, recharger les posts dans la bonne langue si le contexte de langue a changé

  return (
    <>
      <div className="container">
        <Head>
          <title>Le blog</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <NavBar />

        <main className="main belowNavbar">
          <HomePostsDisplay posts={posts} />
        </main>
      </div>
      <Footer />
    </>
  );
}

import Head from "next/head";
import Image from "next/image";
import PostPeek from "../components/posts/PostPeek";
import Test from "../components/Test";
import { getAllPosts } from "../services/api/post";
import styles from "../styles/Home.module.css";

export async function getServerSideProps({ req }) {
  const resp = await getAllPosts();

  return { props: { pageData: resp } };
}

export default function Home({ pageData }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Le blog</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Le blog</h1>
        {pageData.map((post, index) => (
          <PostPeek post={post} key={index} />
        ))}
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}

import Head from "next/head";
import styles from "../styles/Home.module.css";

// Create / Edit
// Faut-il accepter un paramètre et changer le comportement en fonction de sa présence ?

export default function Post() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Post</title>
      </Head>

      <main className={styles.main}>Main</main>
    </div>
  );
}

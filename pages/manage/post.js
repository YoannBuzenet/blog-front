import Head from "next/head";
import styles from "../styles/Home.module.css";

// Create / Edit
// Faut-il accepter un paramètre et changer le comportement en fonction de sa présence ?

// Comment gérer la sauvegarde ?  Est-ce que cela devrait être centralisé quelquepart ?

export default function Post() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Post</title>
      </Head>

      <main className={styles.main}>
        {/* Charger un wysiwyg
          Ou editer un Wysiwyg */}
        <p>Main</p>
      </main>
    </div>
  );
}

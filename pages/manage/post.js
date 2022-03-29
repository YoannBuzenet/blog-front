import Head from "next/head";
import { useState } from "react";
import RichText from "../../components/wysiwyg/RichText";
import styles from "../../styles/Home.module.css";

// Create / Edit
// Faut-il accepter un paramètre et changer le comportement en fonction de sa présence ?

// Comment gérer la sauvegarde ?  Est-ce que cela devrait être centralisé quelquepart ?

export default function Post() {
  const [value, setValue] = useState([
    {
      type: "paragraph",
      children: [
        { text: "This is editable " },
        { text: "rich", bold: true },
        { text: " text, " },
        { text: "much", italic: true },
        { text: " better than a " },
        { text: "<textarea>", code: true },
        { text: "!" },
      ],
    },
    {
      type: "paragraph",
      children: [
        {
          text: "Since it's rich text, you can do things like turn a selection of text ",
        },
        { text: "bold", bold: true },
        {
          text: ", or add a semantically rendered block quote in the middle of the page, like this:",
        },
      ],
    },
    {
      type: "block-quote",
      children: [{ text: "A wise quote." }],
    },
    {
      type: "paragraph",
      align: "center",
      children: [{ text: "Try it out for yourself!" }],
    },
  ]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Post</title>
      </Head>

      <main className={styles.main}>
        {/* Charger un wysiwyg
          Ou editer un Wysiwyg */}
        <p>Main</p>
        <RichText value={value} setValue={setValue} />
      </main>
    </div>
  );
}

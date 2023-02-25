"use client";
import style from "./TagEditor.module.scss";

const TagEditor = ({ tag }) => {
  return (
    <div className={style.container}>
      <p>{tag.name}</p>
      <p>{tag.color_hexcode}</p>
      <p>{tag.language}</p>
    </div>
  );
};

export default TagEditor;

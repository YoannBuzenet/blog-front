"use client";
import { useState } from "react";
import style from "./TagEditor.module.scss";

const TagEditor = ({ tag }) => {
  const [tagState, setTagState] = useState({
    name: tag.name,
    color_hexcode: tag.color_hexcode,
    language: tag.language,
  });

  return (
    <div className={style.container}>
      <p>{tagState.name}</p>
      <p>{tagState.color_hexcode}</p>
      <p>{tagState.language}</p>
    </div>
  );
};

export default TagEditor;

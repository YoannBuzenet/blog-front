"use client";
import InputField from "../../generic/InputField/InputField";
import style from "./TagEditor.module.scss";

const TagEditor = ({ tag, setTagState }) => {
  return (
    <div className={style.container}>
      <p>{tag.name}</p>
      <InputField
        handleChange={setTagState}
        propToAffect={tag.id}
        id={tag.id + ``}
        value={tag.name}
      />

      <p>{tag.color_hexcode}</p>
      <p>{tag.language}</p>
    </div>
  );
};

export default TagEditor;

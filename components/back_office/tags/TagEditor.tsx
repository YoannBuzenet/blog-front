"use client";
import InputField from "../../generic/InputField/InputField";
import style from "./TagEditor.module.scss";

const TagEditor = ({ tag, setTagStateName, setTagColor }) => {
  return (
    <div className={style.container}>
      <p>{tag.name}</p>
      <InputField
        handleChange={setTagStateName}
        propToAffect={tag.id}
        id={tag.id + ``}
        value={tag.name}
      />

      <p>
        <input
          type="color"
          value={tag.color_hexcode}
          onChange={(e) => setTagColor(e.target.value, tag.id)}
        />
      </p>
      <p>{tag.language}</p>
    </div>
  );
};

export default TagEditor;

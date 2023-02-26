"use client";
import InputField from "../../generic/InputField/InputField";
import style from "./TagEditor.module.scss";

const TagEditor = ({ tag, setTagStateName, setTagColor }) => {
  return (
    <div className={style.container}>
      <div className={style.inputNameContainer}>
        <InputField
          handleChange={setTagStateName}
          propToAffect={tag.id}
          id={tag.id + ``}
          value={tag.name}
        />
      </div>
      <div className={style.inputColorContainer}>
        <p>
          <input
            className={style.inputColor}
            type="color"
            value={tag.color_hexcode}
            onChange={(e) => setTagColor(e.target.value, tag.id)}
          />
        </p>
      </div>
      <div className={style.inputLanguageContainer}>
        <p>{tag.language}</p>
      </div>
    </div>
  );
};

export default TagEditor;

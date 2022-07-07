import React, { useContext } from "react";
import PlainTextEditor from "../../../generic/wysiwyg/plainText";
import style from "../../../../styles/back_office/pages/contentPage/SimpleField.module.css";

const SimpleField = ({ value, setValue, title, field, showError }) => {
  return (
    <>
      <div className={`field ${style.field}`}>
        <p>{title}</p>
        <PlainTextEditor
          setValue={setValue}
          value={value}
          field={field}
          showError={showError}
        />
      </div>
    </>
  );
};

export default SimpleField;

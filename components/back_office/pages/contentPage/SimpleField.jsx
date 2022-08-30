import React, { useContext } from "react";
import PlainTextEditor from "../../../generic/wysiwyg/plainText";
import style from "../../../../styles/back_office/pages/contentPage/SimpleField.module.css";

const SimpleField = ({
  value,
  setValue,
  title,
  field,
  showError,
  labelCTA,
  handleClickCTA,
  svgCTA,
}) => {
  const isThereCTA = Boolean(handleClickCTA) && Boolean(svgCTA);
  const SvgIcon = svgCTA;

  return (
    <>
      <div
        className={`field ${style.field} ${isThereCTA ? "fieldWithCTA" : ""}`}
      >
        <p>{title}</p>
        <PlainTextEditor
          setValue={setValue}
          value={value}
          field={field}
          showError={showError}
        />
        {isThereCTA && (
          <span>
            <SvgIcon className="actionableSvg" />
          </span>
        )}
      </div>
    </>
  );
};

export default SimpleField;

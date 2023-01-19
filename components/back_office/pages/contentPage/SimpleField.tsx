import React, { useContext } from "react";
import PlainTextEditor from "../../../generic/wysiwyg/PlainText";
import style from "../../../../styles/back_office/pages/contentPage/SimpleField.module.css";

// TODO finish types
export type SimpleFieldProps = {
  value: string;
  setValue: any;
  title: any;
  field: any;
  showError?: boolean;
  labelCTA?: any;
  handleClickCTA?: any;
  svgCTA?: any;
};

const SimpleField = ({
  value,
  setValue,
  title,
  field,
  showError,
  labelCTA,
  handleClickCTA,
  svgCTA,
}: SimpleFieldProps) => {
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
          <span onClick={handleClickCTA}>
            <SvgIcon className="actionableSvg" />
          </span>
        )}
      </div>
    </>
  );
};

export default SimpleField;

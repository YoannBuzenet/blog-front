import * as React from "react";
import TextField from "@mui/material/TextField";
import style from "../../../styles/generic/InputField/InputField.module.css";

export default function InputField({
  id,
  label,
  variant,
  handleChange,
  value,
  isDisabled = false,
  propToAffect,
  size = "small",
  type = "text",
  triggerOnEnterKey = false,
  actionToDoOnEnter,
}) {
  const handleKeyDown = (e) => {
    if (triggerOnEnterKey) {
      if (e.keyCode == 13) {
        actionToDoOnEnter();
      }
    }
  };

  return (
    <div className={style.container}>
      <TextField
        id={id}
        label={label}
        variant={variant}
        disabled={isDisabled}
        onChange={(e) => handleChange(e, propToAffect)}
        value={value || ""}
        size={size}
        type={type}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

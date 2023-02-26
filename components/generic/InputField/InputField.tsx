import * as React from "react";
import TextField from "@mui/material/TextField";

type InputFieldProps = {
  id: string;
  label?: string;
  variant?: "standard" | "filled" | "outlined";
  handleChange: (e: any, propToAffect: string) => void;
  value: string;
  isDisabled?: boolean;
  propToAffect: string;
  size?: any;
  type?: any;
  triggerOnEnterKey?: boolean;
  actionToDoOnEnter?: () => void;
};

// Use for regular field input.
// For react-slate content (in JSON, see type ReactSlateElement), use PlainTextEditor or RichTextEditor
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
}: InputFieldProps) {
  const handleKeyDown = (e) => {
    if (triggerOnEnterKey) {
      if (e.keyCode == 13) {
        actionToDoOnEnter();
      }
    }
  };

  return (
    <div className={``}>
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

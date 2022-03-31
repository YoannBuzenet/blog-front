import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Save from "@mui/icons-material/Save";
import LogoutIcon from "@mui/icons-material/Logout";
import SpinningLoaderButton from "../Loaders/CSSLoader/SpinningLoaderButton";

export default function BasicButton({
  variant = "contained",
  handleClick,
  text,
  spacing = "2",
  color = "primary",
  isDisabled,
  isLoading = false,
  iconToDisplay,
  isLetterCapitalize = false,
  triggerOnEnterKey = false,
}) {
  const iconDictionnary = {
    save: Save,
    loading: SpinningLoaderButton,
    logout: LogoutIcon,
  };

  let iconDisplayed;
  if (isLoading) {
    iconDisplayed = "loading";
  } else {
    iconDisplayed = iconToDisplay;
  }

  const IconComponent = iconDictionnary[iconDisplayed];

  let styleToAdd = {};
  if (isLetterCapitalize) {
    styleToAdd = { ...styleToAdd, textTransform: "capitalize" };
  }

  return (
    <Stack direction="row" spacing={spacing}>
      <Button
        variant={variant}
        onClick={handleClick}
        color={color}
        startIcon={iconToDisplay && <IconComponent />}
        disabled={isDisabled}
        style={styleToAdd}
      >
        {text}
      </Button>
    </Stack>
  );
}

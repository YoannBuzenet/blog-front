import { createTheme } from "@mui/material/styles";
import { green, purple, blue } from "@mui/material/colors";

const customMUITheme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
  },
});

module.exports = { customMUITheme };

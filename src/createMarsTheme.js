import { createMuiTheme } from "@material-ui/core/styles";

const createMarsTheme = createMuiTheme({
  palette: {
    primary: {
      light: "#8bc464",
      main: "#6eb63e",
      dark: "#4d7f2b",
      contrastText: "#fff"
    },
    secondary: {
      light: "#c3d753",
      main: "#b4cd28",
      dark: "#7d8f1c",
      contrastText: "#000"
    }
  }
});

export default createMarsTheme;

import React from "react";
import NavBar from "./NavBar/NavBar_old";
import createMarsTheme from "../createMarsTheme";
import { MuiThemeProvider } from "@material-ui/core/styles";

const theme = createMarsTheme;

const LandingPage = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <NavBar />
    </MuiThemeProvider>
  );
};

export default LandingPage;

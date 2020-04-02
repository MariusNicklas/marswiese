import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router";

import "assets/scss/material-kit-pro-react.scss?v=1.8.0";

import { MuiThemeProvider } from "@material-ui/core";
import createMarsTheme from "./createMarsTheme";
import { ShoppingCartContextProvider } from "./myComponents/NavBar/ShoppingCartContext";

import Header from "components/Header/Header.js";
import NavBarItems from "myComponents/NavBar/NavBarItems";
import MainPage from "./myViews/MainPage/MainPage";
import CampsPage from "./myViews/CampsPage/CampsPage";
import CampCreationPage from "./myViews/CampCreationPage/CampCreationPage";
import AuthRoute from "myViews/AuthRoute";
import SignInPage from "myViews/SignIn/SignIn";
import SignUp from "myViews/SignUp/SignUp.component.jsx";

var hist = createBrowserHistory();

const theme = createMarsTheme;

const LoginContainer = () => (
  <div className="container">
    <Route exact path="/registrierung" component={SignUp} />
    <Route exact path="/login" component={SignInPage} />
  </div>
);

function DefaultContainer() {
  return (
    <React.Fragment>
      <Header
        links={<NavBarItems dropdownHoverColor="info" />}
        fixed
        color="transparent"
        changeColorOnScroll={{
          height: 400,
          color: "primary"
        }}
      />
      <Route path="/camps" component={CampsPage} />
      <AuthRoute path="/gestalte-dein-camp" component={CampCreationPage} />
      <Route exact path="/" component={MainPage} />
    </React.Fragment>
  );
}

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <ShoppingCartContextProvider>
      <Router history={hist}>
        <Switch>
          <Route exact path="/registrierung" component={LoginContainer} />
          <Route exact path="/login" component={LoginContainer} />
          <Route component={DefaultContainer} />
        </Switch>
      </Router>
    </ShoppingCartContextProvider>
  </MuiThemeProvider>,
  document.getElementById("root")
);

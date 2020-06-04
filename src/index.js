import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router";

import "assets/scss/material-kit-pro-react.scss?v=1.8.0";

import { MuiThemeProvider } from "@material-ui/core";
import createMarsTheme from "./createMarsTheme";
import { ShoppingCartContextProvider } from "./myComponents/NavBar/ShoppingCartContext";

import MainPage from "./myViews/MainPage/MainPage";
import CampsPage from "./myViews/CampsPage/CampsPage";
import CampCreationPage from "./myViews/CampCreationPage/CampCreationPage";
import AuthRoute from "myViews/AuthRoute";
import SignInPage from "myViews/SignIn/SignIn";
import SignUp from "myViews/SignUp/SignUp.component.jsx";
import SuccessPage from "myViews/SuccessPage";
import CancelPage from "myViews/CancelPage";
import FailurePage from "myViews/FailurePage";
import LocationPage from "myViews/LocationPage/LocationPage";
import BookingsPage from "myViews/BookingsPage/BookingsPage";
import CartPage from "myViews/CartPage/CartPage";
import NavBar from "myComponents/NavBar/NavBar";

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
      {/*<Header
        links={<NavBarItems dropdownHoverColor="info" />}
        fixed
        color="transparent"
        changeColorOnScroll={{
          height: 400,
          color: "primary",
        }}
      />*/}
      <NavBar />
      <Route path="/anfahrt" component={LocationPage} />
      <Route path="/camps" component={CampsPage} />
      <AuthRoute path="/gestalte-dein-camp" component={CampCreationPage} />
      <AuthRoute path="/meine-buchungen" component={BookingsPage} />
      <Route exact path="/" component={MainPage} />
      <Route path="/payment/success" component={SuccessPage} />
      <Route path="/payment/cancel" component={CancelPage} />
      <Route path="/payment/fail" component={FailurePage} />
      <AuthRoute path="/mein-warenkorb" component={CartPage} />
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

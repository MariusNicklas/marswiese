import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router";

import "assets/scss/material-kit-pro-react.scss?v=1.8.0";

import { MuiThemeProvider } from "@material-ui/core";
import createMarsTheme from "./createMarsTheme";
import { ShoppingCartContextProvider } from "./myComponents/NavBar/ShoppingCartContext";
import { UserProvider } from "./userContext";

import MainPage from "./myViews/MainPage/MainPage";
import CampsPage from "./myViews/CampsPage/CampsPage";
import CampCreationPage from "./myViews/CampCreationPage/CampCreationPage";
import AuthRoute from "myViews/AuthRoute";
import SignIn from "myViews/SignIn/SignIn";
import SignUp from "myViews/SignUp/SignUp.component.jsx";
import SuccessPage from "myViews/SuccessPage";
import CancelPage from "myViews/CancelPage";
import FailurePage from "myViews/FailurePage";
import LocationPage from "myViews/LocationPage/LocationPage";
import BookingsPage from "myViews/BookingsPage/BookingsPage";
import CartPage from "myViews/CartPage/CartPage";
import NavBar from "myComponents/NavBar/NavBar";
import CoursesPage from "myViews/CoursesPage/CoursesPage";
import CoursePage from "myViews/CoursePage/CoursePage";
import BookCoursePage from "myViews/BookCoursePage/BookCoursePage";

var hist = createBrowserHistory();

const App = () => {
  const theme = createMarsTheme;
  return (
    <MuiThemeProvider theme={theme}>
      <UserProvider>
        <ShoppingCartContextProvider>
          <Router history={hist}>
            <NavBar />
            <Switch>
              {/* Auth Routes*/}
              <AuthRoute
                path="/gestalte-dein-camp"
                component={CampCreationPage}
              />
              <AuthRoute path="/meine-buchungen" component={BookingsPage} />
              <AuthRoute path="/mein-warenkorb" component={CartPage} />

              {/* Public Routes*/}
              <Route exact path="/" component={MainPage} />
              <Route path="/Anfahrt" component={LocationPage} />
              <Route path="/Camps" component={CampsPage} />
              <Route exact path="/Kurse" component={CoursesPage} />
              <Route exact path="/Kurs/:id/buchen" component={BookCoursePage} />
              <Route path="/Kurs/:id" component={CoursePage} />
              <Route exact path="/login" component={SignIn} />
              <Route path="/payment/cancel" component={CancelPage} />
              <Route path="/payment/fail" component={FailurePage} />
              <Route path="/payment/success" component={SuccessPage} />
              <Route exact path="/Registrierung" component={SignUp} />
            </Switch>
          </Router>
        </ShoppingCartContextProvider>
      </UserProvider>
    </MuiThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { isLoggedIn } from "../APIUtils";

const AuthRoute = ({ component: Component, ...rest }) => {
  const [loading, setloading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    isLoggedIn()
      .then(res => {
        if (res) {
          setAuthenticated(true);
        }
        setloading(false);
      })
      .catch(err => setloading(false));
  }, []);

  return !loading ? (
    <Route
      {...rest}
      render={props => {
        if (authenticated === true) {
          return <Component {...props} />;
        }
        if (authenticated === false) {
          return <Redirect to={{ pathname: "/signup" }} />;
        }
      }}
    />
  ) : (
    <div>...loading</div>
  );
};

export default AuthRoute;

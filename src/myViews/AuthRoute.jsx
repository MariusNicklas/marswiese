/* eslint-disable react/prop-types */
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
      .catch(() => setloading(false));
  }, []);

  return !loading ? (
    <Route
      {...rest}
      render={props => {
        if (authenticated) {
          return <Component {...props} />;
        }
        if (!authenticated) {
          console.log("next should be " + props.location.pathname);
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { next: props.location.pathname }
              }}
            />
          );
        }
      }}
    />
  ) : (
    <div>...loading</div>
  );
};

export default AuthRoute;

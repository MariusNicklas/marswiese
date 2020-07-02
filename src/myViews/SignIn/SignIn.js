/* eslint-disable react/prop-types */
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Parallax from "components/Parallax/Parallax.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { login } from "../../APIUtils";
import campsStyle from "assets/jss/material-kit-pro-react/views/campsStyle.js";
import { UserContext } from "../../userContext";

const useStyles = makeStyles(campsStyle);

const SignIn = (props) => {
  const classes = useStyles();

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [{ setUser }] = useContext(UserContext);

  // Handle fields change
  const handleChange = (input) => (e) => {
    input(e.target.value);
  };

  async function submitLogin(e) {
    e.preventDefault();
    const response = await login(email, password);
    const {
      history,
      location: { state },
    } = props;

    if (response.status === 200) {
      setUser(email);
      if (state && state.next) {
        return history.push(state.next);
      } else {
        return history.push("/");
      }
    }
  }

  return (
    <React.Fragment>
      <Parallax image={require("assets/img/K1600_mars.JPG")} small>
        <div className={classes.container}>
          <GridContainer>
            <GridItem>
              <div className={classes.brand}>
                <h1>Anmeldung</h1>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <form className={classes.form} noValidate>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              onChange={handleChange(setEmail)}
              id="email"
              value={email}
              label="Email"
              name="email"
              autoComplete="email"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              onChange={handleChange(setPassword)}
              value={password}
              name="password"
              label="Passwort"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={submitLogin}
              className={classes.submit}
            >
              Anmelden
            </Button>

            <Grid container>
              <Grid item xs>
                <Link to="/registrierung" variant="body2">
                  Jetzt registrieren
                </Link>
              </Grid>
              <Grid item xs>
                <Link to="/passwort-vergessen" variant="body2">
                  Passwort vergessen?
                </Link>
              </Grid>
            </Grid>
          </div>
        </div>
      </form>
    </React.Fragment>
  );
};
export default SignIn;

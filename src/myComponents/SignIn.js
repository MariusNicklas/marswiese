import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import entranceStyles from "../entranceStyles";

import { login } from "../APIUtils";

const SignIn = props => {
  const { history } = props;

  const classes = entranceStyles();

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  // Handle fields change
  const handleChange = input => e => {
    input(e.target.value);
  };

  async function handleClick(e) {
    e.preventDefault();
    const response = await login(email, password);
    if (response.status === 200) {
      history.push("/");
    }
  }

  return (
    <React.Fragment>
      <Typography component="h1" variant="h5" align="center">
        Anmeldung
      </Typography>
      <form className={classes.form} noValidate>
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
          onClick={handleClick}
          className={classes.submit}
        >
          Anmelden
        </Button>
        <Grid container>
          <Grid item xs>
            <Link to="/passwort-vergessen" variant="body2">
              Passwort vergessen?
            </Link>
          </Grid>
          <Grid item>
            <Link to="/signup" variant="body2">
              Noch nicht Registriert?
            </Link>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
};
export default withRouter(SignIn);

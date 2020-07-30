/* eslint-disable react/prop-types */
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import { login } from '../../APIUtils';
import campsStyle from 'assets/jss/material-kit-pro-react/views/campsStyle.js';
//import { UserContext } from '../../userContext';
import { DivWithErrorHandling } from '../../myComponents/ErrorHandler/ErrorHandler';
import { DivWithParallaxPaper } from 'myComponents/withParallaxPaper';

import UserContext from '../../context/userContext';

import ParallaxImage from 'assets/img/K1600_mars.JPG';

const useCampStyles = makeStyles(campsStyle);

const SignIn = props => {
  const campStyleClasses = useCampStyles();

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorCode, setErrorCode] = useState(null);

  const { setUserData } = useContext(UserContext);

  const submitLogin = async e => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      setUserData({
        firstName: response.data.data.user.firstName,
        lastName: response.data.data.user.lastName,
        id: response.data.data.user._id
      });

      const {
        history,
        location: { state }
      } = props;

      if (response.data.status === 'success') {
        if (state && state.next) {
          return history.push(state.next);
        } else {
          history.push('/');
        }
      }
    } catch (error) {
      //setErrorCode(error.response.data.error.statusCode);
      console.log(error);
    }
  };

  return (
    <DivWithErrorHandling errorMessage={errorCode}>
      <DivWithParallaxPaper title="Anmeldung" image={ParallaxImage}>
        <div className={campStyleClasses.container}>
          <form onSubmit={submitLogin}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              onChange={e => setEmail(e.target.value)}
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
              onChange={e => setPassword(e.target.value)}
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
              onClick={e => submitLogin(e)}
              className={campStyleClasses.submit}
            >
              Anmelden
            </Button>
          </form>

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
      </DivWithParallaxPaper>
    </DivWithErrorHandling>
  );
};
export default SignIn;

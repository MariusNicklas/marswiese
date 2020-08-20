import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import { postCoursePseudoBooking } from '../../APIUtils';
import campsStyle from 'assets/jss/material-kit-pro-react/views/campsStyle.js';
import UserContext from '../../context/UserContext';
import { DivWithParallaxPaper } from 'myComponents/withParallaxPaper';

const useStyles = makeStyles(campsStyle);

const BookCoursePage = props => {
  const classes = useStyles();

  const { userData } = useContext(UserContext);
  const { history } = props;

  const [participant, setParticipant] = useState({
    firstName: '',
    lastName: ''
  });

  let { id: courseId } = useParams();

  useEffect(() => {
    setParticipant(userData);
  }, [userData]);

  // Handle fields change
  const updateField = e => {
    setParticipant({
      ...participant,
      [e.target.name]: e.target.value
    });
  };

  const submitBooking = async e => {
    e.preventDefault();
    try {
      await postCoursePseudoBooking({
        course: courseId,
        user: userData.id,
        participant: {
          name: participant.firstName + ' ' + participant.lastName
        }
      });
      history.push('/mein-warenkorb');
    } catch {}
  };

  return (
    <React.Fragment>
      <DivWithParallaxPaper image="https://www.marswiese.at/wordpress/wp-content/uploads/Banner3.jpg">
        <form className={classes.form} noValidate>
          <div className={classes.container}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              onChange={updateField}
              id="firstName"
              defaultValue={userData.firstName}
              value={participant.firstName}
              label="Vorname Teilnehmer"
              name="firstName"
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              onChange={updateField}
              id="lastName"
              defaultValue={userData.lastName}
              value={participant.lastName}
              label="Nachname Teilnehmer"
              name="lastName"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={submitBooking}
              className={classes.submit}
            >
              Teilnehmer anmelden
            </Button>
          </div>
        </form>
      </DivWithParallaxPaper>
    </React.Fragment>
  );
};

export default BookCoursePage;

import React, { useContext, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
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
import { postCoursePseudoBooking } from "../../APIUtils";
import campsStyle from "assets/jss/material-kit-pro-react/views/campsStyle.js";
import { UserContext } from "../../userContext";

const useStyles = makeStyles(campsStyle);

const BookCoursePage = (props) => {
  const classes = useStyles();

  const [user] = useContext(UserContext);
  const [participant, setParticipant] = useState({
    firstName: "",
    lastName: "",
  });

  let { id: courseId } = useParams();

  useEffect(() => {
    setParticipant(user);
  }, [user]);

  // Handle fields change
  const updateField = (e) => {
    setParticipant({
      ...participant,
      [e.target.name]: e.target.value,
    });
  };

  const submitBooking = async (e) => {
    e.preventDefault();
    try {
      console.log(courseId);
      console.log(user.id);
      console.log(participant.firstName + " " + participant.lastName);
      const response = await postCoursePseudoBooking({
        course: courseId,
        user: user.id,
        participant: {
          name: participant.firstName + " " + participant.lastName,
        },
      });
    } catch {}
  };

  return (
    <React.Fragment>
      <Parallax
        image={require("assets/img/K1600_mars.JPG")}
        small
        filter="dark"
      >
        {" "}
        <div className={classes.container}>
          <GridContainer>
            <GridItem>
              <div className={classes.brand}>
                <h1>Buchung</h1>
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
              onChange={updateField}
              id="firstName"
              defaultValue={user.firstName}
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
              defaultValue={user.lastName}
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
        </div>
      </form>
    </React.Fragment>
  );
};

export default BookCoursePage;

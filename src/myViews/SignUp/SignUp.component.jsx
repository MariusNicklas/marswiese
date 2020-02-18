import React, { useReducer } from "react";
import { withRouter } from "react-router-dom";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import PersonalData from "./PersonalData.component";
import AddressData from "./AddressData.component";
import PasswordData from "./PasswordData.component";
import SummaryTable from "./SummaryTable.component";
import { register } from "../../APIUtils";
import { Link } from "react-router-dom";
import DataContext from "./DataContext";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Parallax from "components/Parallax/Parallax.js";

import campsStyle from "assets/jss/material-kit-pro-react/views/campsStyle.js";

const useStyles = makeStyles(campsStyle);
function reducer(state, action) {
  switch (action.type) {
    case "field-change": {
      return {
        ...state,
        [action.field]: action.value
      };
    }

    default: {
      return state;
    }
  }
}

const SignUp = props => {
  const classes = useStyles();
  // STATE VARIABLES
  const [activeStep, setActiveStep] = React.useState(0);

  const [steps] = React.useState([
    "Persönliche Angaben",
    "Adresse",
    "Passwort",
    "Eingaben überprüfen"
  ]);

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const [state, dispatch] = useReducer(reducer, {
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    zip: "",
    city: "",
    password: "",
    confirmPassword: ""
  });

  const nextStep = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  async function handleSubmit(e) {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const response = await register({
        firstName: state.firstName,
        lastName: state.lastName,
        email: state.email,
        street: state.street,
        plz: state.zip,
        city: state.city,
        password: state.password,
        passwordConfirm: state.confirmPassword
      });

      const status = await response.status;

      if (status === 201) {
        props.history.push("/signup-success");
      }
    } catch (err) {
      props.history.push("/signup-error");
    }

    setIsSubmitting(false);
  }

  const getStepContent = step => {
    switch (step) {
      case 0:
        return <PersonalData handleNext={nextStep} handleChange={dispatch} />;

      case 1:
        return <AddressData handleNext={nextStep} handleBack={handleBack} />;

      case 2:
        return <PasswordData handleNext={nextStep} handleBack={handleBack} />;

      case 3:
        return (
          <SummaryTable
            handleBack={handleBack}
            handleSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        );

      default:
        break;
    }
  };

  return (
    <React.Fragment>
      <Parallax image={require("assets/img/K1600_mars.JPG")} small>
        <div className={classes.container}>
          <GridContainer>
            <GridItem>
              <div className={classes.brand}>
                <h1>Registrierung</h1>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <DataContext.Provider value={{ state, dispatch }}>
            <Stepper activeStep={activeStep} orientation="vertical">
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                  <StepContent>{getStepContent(activeStep)}</StepContent>
                </Step>
              ))}
            </Stepper>

            <Link to="/signin">Schon registriert?</Link>
          </DataContext.Provider>
        </div>
      </div>
    </React.Fragment>
  );
};

export default withRouter(SignUp);

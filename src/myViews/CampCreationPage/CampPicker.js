import React, { useContext, useReducer } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CampCreateChildPersonalData from "./CampPickerComponents/CampCreateChildPersonalData";
import CampCreateChildAdressData from "./CampPickerComponents/CampCreateChildAdressData";
import PickChildAllergies from "./PickChildAllergies";
import CampPickWeek from "./CampPickerComponents/CampPickWeek";
import CampPickFinish from "./CampPickerComponents/CampPickFinish";
import CampPickCamp from "./CampPickerComponents/CampPickCamp";
import CampPickChildCare from "./CampPickerComponents/CampPickChildCare";
import CampCreationContext from "./CampCreationContext";
import UserContext from "./UserContext";
import { Box } from "@material-ui/core";
import { postCampPseudoBooking } from "../../APIUtils";

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
    case "login": {
      return {
        ...state,
        authenticated: true
      };
    }
    case "logout": {
      return {
        ...state,
        authenticated: false
      };
    }
    default: {
      return state;
    }
  }
}

function getSteps() {
  return [
    "Wer nimmt teil?",
    "Kontakt",
    "Krankheiten/Allergien",
    "Welche Woche?",
    "Camps wählen",
    "Randbetreuung",
    "Abschließen"
  ];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return (
        <Box minHeight="200px">
          <CampCreateChildPersonalData />
        </Box>
      );
    case 1:
      return (
        <Box minHeight="200px">
          <CampCreateChildAdressData />
        </Box>
      );
    case 2:
      return (
        <Box minHeight="200px">
          <PickChildAllergies />
        </Box>
      );
    case 3:
      return (
        <Box minHeight="200px">
          <CampPickWeek />
        </Box>
      );
    case 4:
      return (
        <Box minHeight="200px">
          <CampPickCamp />
        </Box>
      );
    case 5:
      return (
        <Box minHeight="200px">
          <CampPickChildCare />
        </Box>
      );
    case 6:
      return (
        <Box minHeight="200px">
          <CampPickFinish />
        </Box>
      );
    default:
      return "Unknown stepIndex";
  }
}

// eslint-disable-next-line react/prop-types
const CampPicker = ({ width }) => {
  const classes = useStyles();

  const [state, dispatch] = useReducer(reducer, {
    authenticated: false,
    firstName: "",
    lastName: "",
    birthday: "",
    emergencyNumber: "",
    address: "",
    zip: "",
    city: "",
    allergies: [],
    diseases: "",
    measures: "",
    week: [],
    campMorning: "",
    campAfternoon: "",
    morningCare: false,
    afternoonCare: false
  });

  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const [isSending, setIsSending] = React.useState(false);

  async function submitBooking() {
    try {
      setIsSending(true);
      const response = await postCampPseudoBooking({
        kid: { name: state.firstName + " " + state.lastName },
        morningChildCare: state.morningCare,
        afternoonChildCare: state.afternoonCare,
        camps: [state.campMorning, state.campAfternoon]
      });

      if (response.status === 201) {
        console.log("camp successfully booked");
        console.log(response);
      }
    } catch (err) {
      console.log("error");
    }
    setIsSending(false);
  }

  // USER CONTEXT
  const user = useContext(UserContext);

  return (
    <UserContext.Provider value={user}>
      <CampCreationContext.Provider
        value={{ state: state, dispatch: dispatch }}
      >
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{isWidthUp("sm", width) ? label : ""}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <GridContainer justify="center">
          <GridItem md={10} sm={10} xs={12}>
            {activeStep === steps.length ? (
              <div>
                <h3>Alle Schritte abgeschlossen</h3>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={submitBooking}
                  className={classes.nextButton}
                >
                  In den Warenkorb
                </Button>
              </div>
            ) : (
              <div>
                <h3>
                  {isWidthUp("sm", width)
                    ? steps[activeStep]
                    : `Schritt ${activeStep + 1}: ${steps[activeStep]}`}
                </h3>
                {getStepContent(activeStep)}
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.backButton}
                  >
                    Zurück
                  </Button>
                  <Button
                    variant="contained"
                    disabled={isSending}
                    color="primary"
                    onClick={handleNext}
                    className={classes.nextButton}
                  >
                    {activeStep === steps.length - 1
                      ? "Fertigstellen"
                      : "Weiter"}
                  </Button>
                </div>
              </div>
            )}
          </GridItem>
        </GridContainer>
      </CampCreationContext.Provider>
    </UserContext.Provider>
  );
};

export default withWidth()(CampPicker);

import React from "react";
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

import campsStyle from "assets/jss/material-kit-pro-react/views/campsStyle.js";

const useStyles = makeStyles(campsStyle);

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
      return <CampCreateChildPersonalData />;
    case 1:
      return <CampCreateChildAdressData />;
    case 2:
      return <PickChildAllergies />;
    case 3:
      return <CampPickWeek />;
    case 4:
      return <CampPickCamp />;
    case 5:
      return <CampPickChildCare />;
    case 6:
      return <CampPickFinish />;
    default:
      return "Unknown stepIndex";
  }
}

// eslint-disable-next-line react/prop-types
const CampPicker = ({ width }) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div>
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
              <Button onClick={handleReset}>Zurücksetzen</Button>
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
                  color="primary"
                  onClick={handleNext}
                >
                  {activeStep === steps.length - 1 ? "Abschließen" : "Weiter"}
                </Button>
              </div>
            </div>
          )}
        </GridItem>
      </GridContainer>
    </div>
  );
};

export default withWidth()(CampPicker);

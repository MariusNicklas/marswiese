import React, { useContext, useEffect, useState } from "react";
import Button from "@material-ui/core/Button";

import ValidatedTextField from "./ValidatedTextField.component";
import DataContext from "./DataContext";

export default function PersonalData(props) {
  // Global state
  const { state, dispatch } = useContext(DataContext);

  const [hasErrors, setHasErrors] = useState({
    v1: false,
    v2: false
  });

  const [disableButton, setDisableButton] = useState(false);

  useEffect(() => {
    setDisableButton(hasErrors.v1 || hasErrors.v2);
  }, [hasErrors]);

  const longEnough = value => {
    return value.length >= 8;
  };

  const confirm = () => {
    return state.password === state.confirmPassword;
  };

  return (
    <React.Fragment>
      <ValidatedTextField
        id="password"
        type="password"
        name="password"
        label="Passwort"
        required
        fullWidth
        value={state.password}
        handleChange={e =>
          dispatch({
            type: "field-change",
            field: "password",
            value: e.target.value
          })
        }
        handleBlur={props.handleBlur}
        validators={[
          {
            validator: longEnough,
            text: "Passwort muss länger als 8 Zeichen sein"
          }
        ]}
        parentCallback={el => setHasErrors(prev => ({ ...prev, v1: el }))}
      />

      <ValidatedTextField
        id="confirmPassword"
        type="password"
        name="confirmPassword"
        label="Passwort bestätigen"
        required
        fullWidth
        value={state.confirmPassword}
        handleChange={e =>
          dispatch({
            type: "field-change",
            field: "confirmPassword",
            value: e.target.value
          })
        }
        handleBlur={props.handleBlur}
        validators={[
          { validator: confirm, text: "Passwörter müssen übereinstimmen" }
        ]}
        parentCallback={el => setHasErrors(prev => ({ ...prev, v2: el }))}
      />

      <Button variant="contained" color="primary" onClick={props.handleBack}>
        Zurück
      </Button>

      <Button
        variant="contained"
        color="primary"
        onClick={props.handleNext}
        disabled={disableButton}
      >
        Nächste
      </Button>
    </React.Fragment>
  );
}

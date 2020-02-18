import React, { useContext, useEffect, useState } from "react";
import Button from "@material-ui/core/Button";

import DataContext from "./DataContext";
import ValidatedTextField from "./ValidatedTextField.component";
import { isEmpty } from "validator";

export default function PersonalData(props) {
  // Global state
  const { state, dispatch } = useContext(DataContext);

  const [hasErrors, setHasErrors] = useState({
    v1: false,
    v2: false,
    v3: false
  });

  const [disableButton, setDisableButton] = useState(false);

  useEffect(() => {
    setDisableButton(hasErrors.v1 || hasErrors.v2 || hasErrors.v3);
  }, [hasErrors]);

  const notEmpty = value => {
    return !isEmpty(value);
  };

  return (
    <React.Fragment>
      <ValidatedTextField
        id="street"
        type="text"
        name="street"
        label="Strasse"
        required
        fullWidth
        value={state.street}
        handleChange={e =>
          dispatch({
            type: "field-change",
            field: "street",
            value: e.target.value
          })
        }
        handleBlur={props.handleBlur}
        validators={[
          { validator: notEmpty, text: "Straße darf nicht leer sein" }
        ]}
        parentCallback={el => setHasErrors(prev => ({ ...prev, v1: el }))}
      />

      <ValidatedTextField
        id="zip"
        type="text"
        name="zip"
        label="Postleitzahl"
        required
        fullWidth
        value={state.zip}
        handleChange={e =>
          dispatch({
            type: "field-change",
            field: "zip",
            value: e.target.value
          })
        }
        handleBlur={props.handleBlur}
        validators={[
          { validator: notEmpty, text: "Postleitzahl darf nicht leer sein" }
        ]}
        parentCallback={el => setHasErrors(prev => ({ ...prev, v2: el }))}
      />

      <ValidatedTextField
        id="city"
        type="text"
        name="city"
        label="Stadt"
        required
        fullWidth
        value={state.city}
        handleChange={e =>
          dispatch({
            type: "field-change",
            field: "city",
            value: e.target.value
          })
        }
        handleBlur={props.handleBlur}
        validators={[
          { validator: notEmpty, text: "Stadt darf nicht leer sein" }
        ]}
        parentCallback={el => setHasErrors(prev => ({ ...prev, v3: el }))}
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

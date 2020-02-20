/* eslint-disable react/prop-types */
import React, { useContext, useState, useEffect } from "react";
import DataContext from "./DataContext";
import Button from "@material-ui/core/Button";

import ValidatedTextField from "../../myComponents/ValidatedTextField.component";
import { isEmpty, isEmail } from "validator";

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
        id="firstName"
        type="text"
        name="firstName"
        label="Vorname"
        required
        fullWidth
        value={state.firstName}
        handleChange={e =>
          dispatch({
            type: "field-change",
            field: "firstName",
            value: e.target.value
          })
        }
        handleBlur={props.handleBlur}
        validators={[
          { validator: notEmpty, text: "Vorname darf nicht leer sein" }
        ]}
        parentCallback={el => setHasErrors(prev => ({ ...prev, v1: el }))}
      />

      <ValidatedTextField
        id="lastName"
        type="text"
        name="lastName"
        label="Nachname"
        required
        fullWidth
        value={state.lastName}
        handleChange={e =>
          dispatch({
            type: "field-change",
            field: "lastName",
            value: e.target.value
          })
        }
        handleBlur={props.handleBlur}
        validators={[
          { validator: notEmpty, text: "Nachname darf nicht leer sein" }
        ]}
        parentCallback={el => setHasErrors(prev => ({ ...prev, v2: el }))}
      />

      <ValidatedTextField
        id="email"
        type="email"
        name="email"
        label="Email"
        required
        fullWidth
        value={state.email}
        handleChange={e =>
          dispatch({
            type: "field-change",
            field: "email",
            value: e.target.value
          })
        }
        handleBlur={props.handleBlur}
        validators={[
          { validator: isEmail, text: "Keine gültige Email Adresse" }
        ]}
        parentCallback={el => setHasErrors(prev => ({ ...prev, v3: el }))}
      />

      <Button
        variant="contained"
        color="primary"
        disabled={disableButton}
        onClick={props.handleNext}
      >
        Nächste
      </Button>
    </React.Fragment>
  );
}

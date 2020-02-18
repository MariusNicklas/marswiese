import React, { useState, useEffect } from "react";
import { TextField } from "@material-ui/core";

export default function ValidatedTextField(props) {
  const {
    value,
    handleChange,
    handleBlur,
    validators,
    errorText,
    parentCallback,
    ...rest
  } = props;

  //validators = [{validator: v1, text: t1},{validator: v2, text: t2}]

  const [helpText, setHelpText] = useState("");

  useEffect(() => {
    setHelpText("");
    if (value) {
      validators.map(tmp => {
        if (!tmp.validator(value)) {
          setHelpText(prev => prev + tmp.text);
        }
        return "";
      });
    }
  }, [validators, value]);

  useEffect(() => {
    if (value) {
      validators.every(tmp => tmp.validator(value))
        ? parentCallback(false)
        : parentCallback(true);
    } else {
      parentCallback(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <TextField
      {...rest}
      variant="outlined"
      margin="normal"
      onChange={handleChange}
      onBlur={handleBlur}
      value={value}
      error={!(helpText === "")}
      helperText={helpText}
    />
  );
}

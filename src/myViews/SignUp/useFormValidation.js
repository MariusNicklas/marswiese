import React from "react";

import { register } from "../../helpers/APIUtils";

function useFormValidation(initialState, validate) {
  const [values, setValues] = React.useState(initialState);
  const [errors, setErrors] = React.useState({});
  const [isSubmitting, setSubmitting] = React.useState(false);

  React.useEffect(() => {
    if (isSubmitting) {
      const noErrors = Object.keys(errors).length === 0;
      if (noErrors) {
        console.log("authenticated!", values.email, values.password);
        setSubmitting(false);
      } else {
        setSubmitting(false);
      }
    }
  }, [errors]);

  function handleChange(event) {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  }

  function handleBlur() {
    const validationErrors = validate(values);
    setErrors(validationErrors);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    setSubmitting(true);
    
    register({
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      street: values.street,
      plz: values.zip,
      city: values.city,
      password: values.password,
      passwordConfirm: values.confirmPassword
    })
    .then(response => console.log("Response: " + response))
    .catch(err => { console.log("Error: " + err); throw(err) })
  }

  return {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    isSubmitting
  };
}

export default useFormValidation;

export default function validateAuth(values) {

    let errors = {};

    if(!values.firstName) {
        errors.firstName = "Kein Vorname angegeben";
    }
    if(!values.lastName) {
        errors.lastName = "Kein Nachname angegeben";
    }
    // Email Errors
    if (!values.email) {
      errors.email = "Keine Email angegeben";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Ungültige Email Adresse";
    }
    if(!values.street) {
        errors.street = "Keine Straße angegeben";
    }
    if(!values.zip) {
        errors.zip = "Keine PLZ angegeben";
    }
    if(!values.city) {
        errors.city = "Keine Stadt angegeben";
    }
    // Password Errors
    if (!values.password) {
      errors.password = "Kein Passwort angegeben";
    } else if (values.password.length < 6) {
      errors.password = "Passwort muss mindestens 6 Zeichen enthalten";
    }
    if (!values.passwordConfirm) {
      errors.passwordConfirm = "Passwort nicht bestätigt";
    } else if (values.password !== values.passwordConfirm) {
      errors.password = "Passwörter stimmen nicht überein!";
    }
    return errors;
  }
  
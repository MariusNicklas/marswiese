import React from "react";
import { Link, withRouter } from "react-router-dom";

const SuccessPage = props => {
  return (
    <div className="row justify-content-center">
      <p>Ihre Registrierung war erfolgreich.</p>
      <p>
        Bitte wenden Sie sich an den Systemadministrator, um Zugang zum
        Dashboard zu bekommen.
      </p>
      <Link to="/signin">Zum Login</Link>
    </div>
  );
};

export default withRouter(SuccessPage);

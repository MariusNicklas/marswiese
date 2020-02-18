import React from "react";
import { Link, withRouter } from "react-router-dom";

const ErrorPage = props => {
  return (
    <div className="row justify-content-center">
      <p>Uups.. ein Fehler ist aufgetreten:</p>
      <Link to="/signin">Zum Login</Link>
    </div>
  );
};

export default withRouter(ErrorPage);

// found on https://itnext.io/centralizing-api-error-handling-in-react-apps-810b2be1d39d

import React from 'react';
import './ErrorHandlerStyles.css';

const getErrorMessage = errorCode => {
  switch (errorCode) {
    case 401:
      return 'Benutzername und/oder Passwort falsch!';
    default:
      return null;
  }
};

export const withErrorHandling = WrappedComponent => ({
  errorMessage: errorCode,
  children
}) => {
  return (
    <WrappedComponent>
      {children}
      {errorCode != null && (
        <div className="error-message">{getErrorMessage(errorCode)}</div>
      )}
    </WrappedComponent>
  );
};

export const DivWithErrorHandling = withErrorHandling(({ children }) => (
  <div>{children}</div>
));

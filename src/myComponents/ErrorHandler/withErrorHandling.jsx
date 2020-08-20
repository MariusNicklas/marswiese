// found on https://codeburst.io/displaying-error-messages-in-react-with-a-higher-order-component-hoc-fe2de074bf64

import React from 'react';

import './errorHandlerStyles.css';

export const withErrorHandling = WrappedComponent => ({
  showError,
  errorMessage,
  children
}) => {
  return (
    <WrappedComponent>
      {children}
      {showError && <div className="error-message">{errorMessage}</div>}
    </WrappedComponent>
  );
};

export const DivWithErrorHandling = withErrorHandling(({ children }) => (
  <div>{children}</div>
));

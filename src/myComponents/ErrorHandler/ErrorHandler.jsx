// found on https://itnext.io/centralizing-api-error-handling-in-react-apps-810b2be1d39d

import React from 'react';
import { useLocation } from 'react-router-dom';
import { get } from 'lodash';
import Page404 from './Page404';

const ErrorHandler = ({ children }) => {
  const location = useLocation();

  switch (get(location.state, 'errorStatus')) {
    case 404:
      return <Page404 />;

    // ... cases for other types of errors

    default:
      return children;
  }
};

export default ErrorHandler;

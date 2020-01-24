import React from "react";

const loginContext = React.createContext();

export const loginProvider = loginContext.Provider;

export const loginConsumer = loginContext.Consumer;

export default loginContext;

import React from "react";

const userContext = React.createContext();

export const userProvider = userContext.Provider;

export const userConsumer = userContext.Consumer;

export default userContext;

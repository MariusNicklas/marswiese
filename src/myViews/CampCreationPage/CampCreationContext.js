import React from "react";

const CampCreationContext = React.createContext();

export const CampCreationProvider = CampCreationContext.Provider;

export const CampCreationConsumer = CampCreationContext.Consumer;

export default CampCreationContext;

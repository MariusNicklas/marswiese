import React, { createContext, useEffect, useState } from "react";
import { getMe, isLoggedIn } from "./APIUtils";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await isLoggedIn();
        if (response) {
          const response = await getMe();
          const username = response.firstName + " " + response.lastName;
          setUser(username);
        }
      } catch {}
    })();
  }, []);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {props.children}
    </UserContext.Provider>
  );
};

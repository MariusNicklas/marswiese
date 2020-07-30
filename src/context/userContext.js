import { createContext } from 'react';

export default createContext(null);

/*import React, { createContext, useEffect, useState } from 'react';
import { getMe, isLoggedIn } from './APIUtils';

export const UserContext = createContext();

export const UserProvider = props => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    id: null,
    isAuthenticated: false
  });

  useEffect(() => {
    (async () => {
      try {
        const response = await isLoggedIn();
        if (response) {
          const response = await getMe();
          setUser({
            firstName: response.firstName,
            lastName: response.lastName,
            id: response._id,
            isAuthenticated: true
          }); 
        }
      } catch {}
    })();
  }, []);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {props.children}
    </UserContext.Provider>
  );
};*/

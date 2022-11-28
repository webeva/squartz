/* Auth provider to keep track of the auth state throughout
the entire global context of the app */

import React, { useState } from "react";

const intialState = "loading";

export const AuthContext = React.createContext();

const AuthValue = ({ children }) => {
  const [auth, setAuth] = useState(intialState);
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthValue;

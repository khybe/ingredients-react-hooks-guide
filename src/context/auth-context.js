import React, { useState } from "react";

// Creating the AuthContext using React's createContext function and providing default values.
export const AuthContext = React.createContext({
  isAuth: false,
  login: () => {},
});

// AuthContextProvider component responsible for managing authentication state.
const AuthContextProvider = (props) => {
  // Using the "useState" hook to manage the "isAuthenticated" state, which tracks user authentication status.
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to handle user login and set "isAuthenticated" to true.
  const loginHandler = () => setIsAuthenticated(true);

  // Rendering the AuthContext.Provider with the current authentication state and loginHandler as the value.
  // The AuthContext.Provider wraps its children to provide authentication-related data throughout the app.
  return (
    <AuthContext.Provider
      value={{ login: loginHandler, isAuth: isAuthenticated }}
    >
      {/* Rendering the children components inside the AuthContext.Provider */}
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

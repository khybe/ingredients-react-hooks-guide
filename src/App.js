import React, { useContext } from "react";

// This component represents the main content of the app when the user is authenticated.
import Ingredients from "./components/Ingredients/Ingredients";
// This component represents the authentication form when the user is not authenticated.
import Auth from "./components/Auth";
// This context will provide authentication-related data to this component and its descendants.
import { AuthContext } from "./context/auth-context";

const App = (props) => {
  // This allows us to retrieve the authentication state and actions.
  const authContext = useContext(AuthContext);

  // By default, the authentication form will be displayed when the app loads.
  let content = <Auth />;

  // If the user is authenticated, update the "content" variable to display the "Ingredients" component.
  if (authContext.isAuth) {
    content = <Ingredients />;
  }

  // Returning the "content" variable, which will be either the "Auth" component or the "Ingredients" component.
  return content;
};

export default App;

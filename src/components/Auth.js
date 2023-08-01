import React, { useContext } from "react";

// This component represents a styled card container for UI purposes.
import Card from "./UI/Card";

// This context provides authentication-related data and actions.
import { AuthContext } from "../context/auth-context";
import "./Auth.css";

const Auth = (props) => {
  // Using the "useContext" hook to access the "AuthContext".
  // This allows us to retrieve the authentication context data and actions.
  const authContext = useContext(AuthContext);

  // Function to handle the login action triggered by the "Log In" button click.
  const loginHandler = () => {
    authContext.login();
  };

  // The form is displayed when the user is not authenticated.
  return (
    <div className="auth">
      <Card>
        <h2>You are not authenticated!</h2>
        <p>Please log in to continue.</p>
        <button onClick={loginHandler}>Log In</button>
      </Card>
    </div>
  );
};

export default Auth;

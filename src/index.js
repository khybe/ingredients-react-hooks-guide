import React from "react";

// This function allows us to create a new root-level ReactDOM render tree.
import { createRoot } from "react-dom/client";
import App from "./App";

// This context provider will wrap the entire app and provide authentication-related data to its descendants.
import AuthContextProvider from "./context/auth-context";
import "./index.css";

// Creating a new root-level ReactDOM render tree using the "createRoot" function.
// The render tree will be attached to the HTML element with the ID "root" in the document.
const root = createRoot(document.getElementById("root"));

// Rendering the App component wrapped in the AuthContextProvider.
// This means that the entire app will have access to the authentication context.
root.render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
);

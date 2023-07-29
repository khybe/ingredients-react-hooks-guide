import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import AuthContextProvider from "./context/auth-context";
import "./index.css";

const root = createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
);

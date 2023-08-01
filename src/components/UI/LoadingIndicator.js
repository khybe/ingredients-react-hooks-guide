import React from "react";

import "./LoadingIndicator.css";

// LoadingIndicator component to display a loading spinner while waiting for data to load.
const LoadingIndicator = () => (
  // The "lds-ring" div contains four child div elements that create the spinner effect.
  <div className="lds-ring">
    <div />
    <div />
    <div />
    <div />
  </div>
);

export default LoadingIndicator;

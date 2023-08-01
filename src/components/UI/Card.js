import React from "react";

import "./Card.css";

// Card component to create a styled card container for wrapping other components.
const Card = (props) => {
  // The "card" div acts as a container that wraps its children (content).
  return <div className="card">{props.children}</div>;
};

export default Card;

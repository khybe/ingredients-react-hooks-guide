import React from "react";

import "./ErrorModal.css";

// ErrorModal component to display an error message in a modal overlay.
const ErrorModal = React.memo((props) => {
  return (
    <React.Fragment>
      {/* The "backdrop" div acts as a transparent background and triggers "props.onClose" when clicked. */}
      <div className="backdrop" onClick={props.onClose} />

      {/* The "error-modal" div represents the modal overlay that displays the error message. */}
      <div className="error-modal">
        <h2>An Error Occurred!</h2>
        {/* The error message is displayed using "props.children". */}
        <p>{props.children}</p>

        <div className="error-modal__actions">
          {/* The "Okay" button to dismiss the error modal, which triggers "props.onClose" when clicked. */}
          <button type="button" onClick={props.onClose}>
            Okay
          </button>
        </div>
      </div>
    </React.Fragment>
  );
});

export default ErrorModal;

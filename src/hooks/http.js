import { useReducer, useCallback } from "react";

// Initial state for the HTTP request handling.
const initialState = {
  loading: false,
  error: null,
  data: null,
  extra: null,
  identifier: null,
};

// Reducer function for handling HTTP request actions.
const httpReducer = (currHttpState, action) => {
  switch (action.type) {
    case "SEND":
      // Set loading to true, reset error, data, and extra, and store the request identifier.
      return {
        loading: true,
        error: null,
        data: null,
        extra: null,
        identifier: action.identifier,
      };
    case "RESPONSE":
      // Update loading to false, set responseData, and store extra data.
      return {
        ...currHttpState,
        loading: false,
        data: action.responseData,
        extra: action.extra,
      };
    case "ERROR":
      // Update loading to false and store the error message.
      return { loading: false, error: action.errorMessage };
    case "CLEAR":
      // Reset state to initial state.
      return initialState;
    default:
      throw new Error("Should not be reached!");
  }
};

// Custom hook "useHttp" for handling HTTP requests.
const useHttp = () => {
  // Using the "useReducer" hook to manage HTTP request state using the "httpReducer" function and "initialState".
  const [httpState, dispatchHttp] = useReducer(httpReducer, initialState);

  // Function to clear the HTTP request state.
  const clear = useCallback(() => dispatchHttp({ type: "CLEAR" }), []);

  // Function to send an HTTP request.
  const sendRequest = useCallback(
    (url, method, body, reqExtra, reqIdentifier) => {
      // Dispatch action to indicate that the request is being sent and store the request identifier.
      dispatchHttp({ type: "SEND", identifier: reqIdentifier });

      // Send the actual HTTP request using the "fetch" API.
      fetch(url, {
        method: method,
        body: body,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((responseData) => {
          // Dispatch action to handle the response data and store extra data.
          dispatchHttp({
            type: "RESPONSE",
            responseData: responseData,
            extra: reqExtra,
          });
        })
        .catch((error) => {
          // Dispatch action to handle errors and store an error message.
          dispatchHttp({
            type: "ERROR",
            errorMessage: "Something went wrong, please try again later.",
          });
        });
    },
    []
  );

  // Return the HTTP request state and functions to interact with the HTTP request.
  return {
    isLoading: httpState.loading,
    data: httpState.data,
    error: httpState.error,
    sendRequest: sendRequest,
    reqExtra: httpState.extra,
    reqIdentifier: httpState.identifier,
    clear: clear,
  };
};

export default useHttp;

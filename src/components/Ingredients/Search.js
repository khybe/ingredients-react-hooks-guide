import React, { useState, useEffect, useRef } from "react";

import Card from "../UI/Card";
import useHttp from "../../hooks/http";
import ErrorModal from "../UI/ErrorModal";
import "./Search.css";

const Search = React.memo((props) => {
  // This function is used to filter the ingredients list based on the search query.
  const { onFilterIngredients } = props;

  // Using the "useState" hook to manage the search filter input state.
  const [enteredFilter, setEnteredFilter] = useState("");

  // Using the "useRef" hook to create a reference to the input element.
  const inputRef = useRef();

  // Using the "useHttp" custom hook to manage HTTP requests.
  const { isLoading, data, error, sendRequest, clear } = useHttp();

  // Using the "useEffect" hook to trigger the HTTP request when the search filter changes.
  useEffect(() => {
    // Creating a timer to delay the HTTP request to avoid excessive requests on every keystroke.
    const timer = setTimeout(() => {
      if (enteredFilter === inputRef.current.value) {
        // Constructing the query based on the entered filter value to filter ingredients by title.
        const query =
          enteredFilter.length === 0
            ? ""
            : `?orderBy="title"&equalTo="${enteredFilter}"`;

        // Sending the HTTP request to fetch filtered ingredients data.
        sendRequest(
          process.env.REACT_APP_FIREBASE_URL + "/ingredients.json" + query,
          "GET"
        );
      }
    }, 500);

    // Clearing the timer on cleanup to prevent unwanted requests.
    return () => {
      clearTimeout(timer);
    };
  }, [enteredFilter, sendRequest, inputRef]);

  // Using the "useEffect" hook to handle the response data and filter ingredients on successful HTTP request.
  useEffect(() => {
    if (!isLoading && !error && data) {
      // Creating an array to store the loaded ingredients.
      const loadedIngredients = [];
      for (const key in data) {
        loadedIngredients.push({
          id: key,
          title: data[key].title,
          amount: data[key].amount,
        });
        // Passing the loaded ingredients to the "onFilterIngredients" function for filtering.
        onFilterIngredients(loadedIngredients);
      }
    }
  }, [data, isLoading, error, onFilterIngredients]);

  // Rendering the search section with the error modal and search card.
  return (
    <section className="search">
      {/* Rendering the ErrorModal component when an error occurs. */}
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
      {/* Rendering the Card component to style the search card. */}
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          {/* Displaying "Loading..." while the HTTP request is in progress. */}
          {isLoading && <span>Loading...</span>}
          {/* Input field for the search filter, with a reference and event handling. */}
          <input
            ref={inputRef}
            type="text"
            value={enteredFilter}
            onChange={(event) => setEnteredFilter(event.target.value)}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;

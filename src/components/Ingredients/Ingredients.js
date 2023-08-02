import React, { useReducer, useEffect, useCallback, useMemo } from "react";

import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import ErrorModal from "../UI/ErrorModal";
import Search from "./Search";
// This hook provides functionality for making HTTP requests.
import useHttp from "../../hooks/http";

// Reducer function to manage the state of userIngredients.
const ingredientReducer = (currentIngredients, action) => {
  switch (action.type) {
    case "SET":
      // Setting the state to the new list of ingredients.
      return action.ingredients;
    case "ADD":
      // Adding a new ingredient to the existing list.
      return [...currentIngredients, action.ingredient];
    case "DELETE":
      // Removing an ingredient from the list based on its ID.
      return currentIngredients.filter((ing) => ing.id !== action.id);
    default:
      throw new Error("Should not get there!");
  }
};

function Ingredients() {
  // Using the "useReducer" hook to manage the state of userIngredients using the "ingredientReducer".
  const [userIngredients, dispatch] = useReducer(ingredientReducer, []);

  // Using the "useHttp" custom hook to manage HTTP requests for fetching and manipulating ingredients.
  const {
    isLoading,
    error,
    data,
    sendRequest,
    reqExtra,
    reqIdentifier,
    clear,
  } = useHttp();

  // Using the "useEffect" hook to handle the response data and update userIngredients.
  useEffect(() => {
    if (!isLoading && !error && reqIdentifier === "REMOVE_INGREDIENT") {
      // Dispatching the action to remove the ingredient with the given ID.
      dispatch({ type: "DELETE", id: reqExtra });
    } else if (!isLoading && !error && reqIdentifier === "ADD_INGREDIENT") {
      // Dispatching the action to add the new ingredient to the list.
      dispatch({ type: "ADD", ingredient: { id: data.name, ...reqExtra } });
    }
  }, [data, reqExtra, reqIdentifier, isLoading, error]);

  // Function to filter ingredients based on the search query.
  const filterIngredientsHandler = useCallback((filteredIngredients) => {
    // Dispatching the action to set userIngredients to the filtered list.
    dispatch({ type: "SET", ingredients: filteredIngredients });
  }, []);

  // Function to add a new ingredient.
  const addIngredientHandler = useCallback(
    (ingredient) => {
      // Sending an HTTP request to add the new ingredient to the database.
      sendRequest(
        process.env.REACT_APP_FIREBASE_URL + "/ingredients.json",
        "POST",
        JSON.stringify(ingredient),
        ingredient,
        "ADD_INGREDIENT"
      );
    },
    [sendRequest]
  );

  // Function to remove an ingredient.
  const removeItemHandler = useCallback(
    (itemId) => {
      // Sending an HTTP request to remove the ingredient with the given ID from the database.
      sendRequest(
        `${process.env.REACT_APP_FIREBASE_URL}/ingredients/${itemId}/.json`,
        "DELETE",
        null,
        itemId,
        "REMOVE_INGREDIENT"
      );
    },
    [sendRequest]
  );

  // Using the "useMemo" hook to memoize the IngredientList component.
  const ingredientList = useMemo(() => {
    return (
      <IngredientList
        ingredients={userIngredients}
        onRemoveItem={removeItemHandler}
      />
    );
  }, [userIngredients, removeItemHandler]);

  // Rendering the Ingredients component with the form, search, and list.
  return (
    <div className="App">
      {/* Rendering the ErrorModal component when an error occurs. */}
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}

      {/* Rendering the IngredientForm component to add new ingredients. */}
      <IngredientForm
        onAddIngredient={addIngredientHandler}
        onLoading={isLoading}
      />

      <section>
        {/* Rendering the Search component to filter ingredients. */}
        <Search onFilterIngredients={filterIngredientsHandler} />

        {/* Rendering the IngredientList component to display the list of ingredients. */}
        {ingredientList}
      </section>
    </div>
  );
}

export default Ingredients;

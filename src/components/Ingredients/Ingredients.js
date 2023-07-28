import React, { useState, useReducer, useEffect, useCallback } from "react";

import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import ErrorModal from "../UI/ErrorModal";
import Search from "./Search";

const ingredientReducer = (currentIngredients, action) => {
  switch (action.type) {
    case "SET":
      return action.ingredients;
    case "ADD":
      return [...currentIngredients, action.ingredient];
    case "DELETE":
      return currentIngredients.filter((ing) => ing.id !== action.id);
    default:
      throw new Error("Should not get there!");
  }
};

function Ingredients() {
  const [userIngredients, dispatch] = useReducer(ingredientReducer, []);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  //  Since the Search component now loads ingredients directly, we no longer require this useEffect
  //  hook, which helps us avoid unnecessary extra rendering.

  // useEffect(() => {
  //   fetch(
  //     "https://react-hooks-summary-32605-default-rtdb.firebaseio.com/ingredients.json"
  //   )
  //     .then((response) => response.json())
  //     .then((responseData) => {
  //       const loadedIngredients = [];

  //       for (const key in responseData) {
  //         loadedIngredients.push({
  //           id: key,
  //           title: responseData[key].title,
  //           amount: responseData[key].amount,
  //         });
  //         setUserIngredients(loadedIngredients);
  //       }
  //     });
  // }, []);

  useEffect(() => {
    console.log("RENDERING INGREDIENTS", userIngredients);
  });

  const filterIngredientsHandler = useCallback((filteredIngredients) => {
    dispatch({ type: "SET", ingredients: filteredIngredients });
  }, []);

  const addIngredientHandler = (ingredient) => {
    setIsLoading(true);
    fetch(
      "https://react-hooks-summary-32605-default-rtdb.firebaseio.com/ingredients.json",
      {
        method: "POST",
        body: JSON.stringify(ingredient),
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => {
        setIsLoading(false);
        return response.json();
      })
      .then((responseData) => {
        dispatch({
          type: "ADD",
          ingredient: { id: responseData.name, ...ingredient },
        });
      })
      .catch((error) => {
        setError(
          "Something went wrong with adding ingredient, please try again later, or contact the admin."
        );
        setIsLoading(false);
      });
  };

  const removeItemHandler = (itemId) => {
    setIsLoading(true);
    fetch(
      `https://react-hooks-summary-32605-default-rtdb.firebaseio.com/ingredients/${itemId}/.json`,
      {
        method: "DELETE",
      }
    )
      .then((response) => {
        setIsLoading(false);
        dispatch({ type: "DELETE", id: itemId });
      })
      .catch((error) => {
        setError(
          "Something went wrong with removing ingredient, please try again later, or report this to admin."
        );
        setIsLoading(false);
      });
  };

  const clearErrorHandler = () => {
    setError(null);
  };

  return (
    <div className="App">
      {error && <ErrorModal onClose={clearErrorHandler}>{error}</ErrorModal>}
      <IngredientForm
        onAddIngredient={addIngredientHandler}
        onLoading={isLoading}
      />

      <section>
        <Search onFilterIngredients={filterIngredientsHandler} />
        <IngredientList
          ingredients={userIngredients}
          onRemoveItem={removeItemHandler}
        />
      </section>
    </div>
  );
}

export default Ingredients;

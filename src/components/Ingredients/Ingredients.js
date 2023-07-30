import React, { useReducer, useEffect, useCallback, useMemo } from "react";

import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import ErrorModal from "../UI/ErrorModal";
import Search from "./Search";
import useHttp from "../../hooks/http";

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
  const { isLoading, error, data, sendRequest } = useHttp();

  const filterIngredientsHandler = useCallback((filteredIngredients) => {
    dispatch({ type: "SET", ingredients: filteredIngredients });
  }, []);

  const addIngredientHandler = useCallback((ingredient) => {
    // dispatchHttp({ type: "SEND" });
    // fetch(
    //   "https://react-hooks-summary-32605-default-rtdb.firebaseio.com/ingredients.json",
    //   {
    //     method: "POST",
    //     body: JSON.stringify(ingredient),
    //     headers: { "Content-Type": "application/json" },
    //   }
    // )
    //   .then((response) => {
    //     dispatchHttp({ type: "RESPONSE" });
    //     return response.json();
    //   })
    //   .then((responseData) => {
    //     dispatch({
    //       type: "ADD",
    //       ingredient: { id: responseData.name, ...ingredient },
    //     });
    //   })
    //   .catch((error) => {
    //     dispatchHttp({
    //       type: "ERROR",
    //       errorMessage:
    //         "Something went wrong with adding ingredient, please try again later, or contact the admin.",
    //     });
    //   });
  }, []);

  const removeItemHandler = useCallback(
    (itemId) => {
      sendRequest(
        `https://react-hooks-summary-32605-default-rtdb.firebaseio.com/ingredients/${itemId}/.json`,
        "DELETE"
      );
    },
    [sendRequest]
  );

  const clearErrorHandler = useCallback(() => {
    // dispatchHttp({ type: "CLEAR" });
  }, []);

  const ingredientList = useMemo(() => {
    return (
      <IngredientList
        ingredients={userIngredients}
        onRemoveItem={removeItemHandler}
      />
    );
  }, [userIngredients, removeItemHandler]);

  return (
    <div className="App">
      {error && <ErrorModal onClose={clearErrorHandler}>{error}</ErrorModal>}
      <IngredientForm
        onAddIngredient={addIngredientHandler}
        onLoading={isLoading}
      />

      <section>
        <Search onFilterIngredients={filterIngredientsHandler} />
        {ingredientList}
      </section>
    </div>
  );
}

export default Ingredients;

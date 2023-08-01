import React, { useState } from "react";

import Card from "../UI/Card";
import LoadingIndicator from "../UI/LoadingIndicator";
import "./IngredientForm.css";

// IngredientForm component to handle form inputs for adding new ingredients.
const IngredientForm = React.memo((props) => {
  // Using the "useState" hook to manage the state of "enteredTitle" (ingredient name) and "enteredAmount" (ingredient amount).
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");

  // Logging a message to indicate when the component is being rendered (for debugging purposes).
  console.log("Rendering Ingredient Form");

  // Function to handle form submission when adding a new ingredient.
  const submitHandler = (event) => {
    event.preventDefault();
    // Calling the "onAddIngredient" function with the new ingredient data as an object.
    props.onAddIngredient({ title: enteredTitle, amount: enteredAmount });

    // Clearing the form inputs after submitting the form.
    setEnteredTitle("");
    setEnteredAmount("");
  };

  // Function to handle changes in the ingredient name input field.
  const titleChangeHandler = (event) => setEnteredTitle(event.target.value);

  // Function to handle changes in the ingredient amount input field.
  const amountChangeHandler = (event) => setEnteredAmount(event.target.value);

  // Rendering the ingredient form section.
  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            {/* Input field for entering the ingredient name with the "titleChangeHandler" function handling changes. */}
            <input
              type="text"
              id="title"
              value={enteredTitle}
              onChange={titleChangeHandler}
            />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            {/* Input field for entering the ingredient amount with the "amountChangeHandler" function handling changes. */}
            <input
              type="number"
              id="amount"
              value={enteredAmount}
              onChange={amountChangeHandler}
            />
          </div>
          <div className="ingredient-form__actions">
            {/* Button to add the ingredient to the list with the "submitHandler" function called when clicked. */}
            <button type="submit">Add Ingredient</button>
            {props.onLoading && <LoadingIndicator />}
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;

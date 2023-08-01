import React from "react";

import "./IngredientList.css";

// IngredientList component to display the list of loaded ingredients.
const IngredientList = (props) => {
  // Logging a message to indicate when the component is being rendered (for debugging purposes).
  console.log("Rendering IngredientList");

  // Rendering the ingredient list section.
  return (
    <section className="ingredient-list">
      {/* Heading to indicate the purpose of the list. */}
      <h2>Loaded Ingredients</h2>

      {/* Unordered list to display the loaded ingredients. */}
      <ul>
        {/* Mapping through the "props.ingredients" array to render each ingredient as a list item. */}
        {props.ingredients.map((ig) => (
          <li key={ig.id} onClick={props.onRemoveItem.bind(this, ig.id)}>
            {/* Displaying the ingredient title. */}
            <span>{ig.title}</span>

            {/* Displaying the ingredient amount. */}
            <span>{ig.amount}x</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default IngredientList;

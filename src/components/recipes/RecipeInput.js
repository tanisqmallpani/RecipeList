import React, { useState } from 'react';

import { Recipe } from "../../models/recipe";

import Spinner from '../common/Spinner';

export default function RecipeInput(props) {

  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("")
  const [instructions, setInstructions] = useState("")
  const [saving, setSaving] = useState(false);

  async function onRecipeFormSubmit(e) {
    e.preventDefault();

    const recipe = new Recipe(
      null,
      name,
      ingredients,
      instructions,
    )


    setSaving(true);
    try {
      await props.onRecipeCreated(recipe);
      setName('');
      setIngredients(''); 
      setInstructions('');
    } catch (err) {
      console.log(err);
    }
    setSaving(false);
  }


  return (
    <div className="container mt-5">
      <div className="card card-body">
        <div className="text-center">
          <h1>Add new Recipe</h1>
        </div>

        <form onSubmit = { onRecipeFormSubmit }>
          <div className="mb-3">
            <label className="form-label">Recipe Name:</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Recipe name"
            ></input>
          </div>
          <div className="mb-3">
            <label className="form-label">Recipe Ingredients:</label>
            <input
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Recipe ingredients"
            ></input>
          </div>
          <div className="mb-3">
            <label className="form-label">Recipe Instructions:</label>
            <textarea
              className="form-control"
              rows="5"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
            ></textarea>
          </div>
          <div className="text-center">

          <button
            className="btn btn-outline-secondary px-5"
            type="submit">
            {
              saving ?
                <Spinner variant='info' />
                :
                "Add Recipe"
            }
          </button>

          </div>
        </form>
      </div>
    </div>
  );
}
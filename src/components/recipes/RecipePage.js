import React, { useEffect, useState } from "react";

import RecipeInput from "./RecipeInput";
import RecipeTable from "./RecipeTable";

import recipeService from "../../services/recipe.service";
import Spinner from "../common/Spinner";

export default function RecipePage() {
  useEffect(() => {
    fetchRecipes();
  }, []);

  const [recipes, setRecipes] = useState([]);
  const [fetching, setFetching] = useState(false);

  async function fetchRecipes() {
    setFetching(true);
    try {
      const recipes = await recipeService.readRecipes();
      setRecipes(recipes);
    } catch (err) {
      console.log(err);
    }
    setFetching(false);
  }

  async function onRecipeCreated(recipe) {
    try {
      recipe = await recipeService.createRecipe(recipe);

      // update the recipes state with the new recipe
      const newRecipes = [...recipes, recipe];
      setRecipes(newRecipes);
    } catch (err) {
      console.log(err);
    }
  }

  async function onRecipeUpdated(recipe) {
    try {
      recipe = await recipeService.updateRecipe(recipe);

      const newRecipes = recipes.map((t) => {
        return t.id === recipe.id ? recipe : t;
      });
      setRecipes(newRecipes);
    } catch (err) {
      console.log(err);
    }
  }

  async function onRecipeRemove(recipe) {
    try {
      await recipeService.deleteRecipe(recipe);

      const newRecipes = recipes.filter((t) => {
        return t.id !== recipe.id;
      });
      setRecipes(newRecipes);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="container mt-5">
      <div className="card card-body text-center">
        <h1>Recipe List</h1>
        <hr></hr>
        <div>Our Simple Recipe List</div>

        <RecipeInput onRecipeCreated={onRecipeCreated} />
        {fetching ? (
          <div className="text-center">
            <Spinner variant="info" />
          </div>
        ) : (
          <RecipeTable
            recipes={recipes}
            onRecipeUpdated={onRecipeUpdated}
            onRecipeRemove={onRecipeRemove}
          />
        )}
      </div>
    </div>
  );
}

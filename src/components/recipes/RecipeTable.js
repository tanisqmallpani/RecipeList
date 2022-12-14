import React from 'react'

export default function RecipeTable(props) {

  return (
    <div>
      <table className="table mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Ingredients</th>
            <th>Instructions</th>
          </tr>
        </thead>
        <tbody>
          { 
            props.recipes.map((recipe) => ( 
            <tr key={recipe.id}>
                <td>{recipe.name}</td>
                <td>{recipe.ingredients}</td>
                <td>{recipe.instructions}</td>
                <td>
                  <div onClick={() => props.onRecipeRemove(recipe)}>
                    <i className="bi bi-trash"></i>
                  </div>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}
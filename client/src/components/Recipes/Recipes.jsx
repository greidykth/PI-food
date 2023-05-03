import React from "react";
import { useSelector } from "react-redux";
import Recipe from "../Recipe/Recipe";
import style from "./recipes.module.css";

const Recipes = () => {
  const { allRecipes } = useSelector((state) => state);

  return (
    <div className={style.container}>
      {allRecipes.recipesFromDb && (
        <>
          {allRecipes.recipesFromDb?.map((recipe) => (
            <Recipe
              key={recipe.id}
              id={recipe.id}
              name={recipe.name}
              image={recipe.image}
              diets={recipe.diets}
            />
          ))}
          {allRecipes.recipesFromApi?.map((recipe) => (
            <Recipe
              key={recipe.id}
              id={`A${recipe.id}`}
              name={recipe.name}
              image={recipe.image}
              diets={recipe.diets}
            />
          ))} 
        </>
      )}
      {!allRecipes.recipesFromDb && "Loading..."}
      {allRecipes.recipesFromDb?.length === 0 && allRecipes.recipesFromApi?.length === 0 && "There are not recipes to show"}
    </div>
  );
};

export default Recipes;

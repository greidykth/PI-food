import React from "react";
import { useSelector } from "react-redux";
import Recipe from "../Recipe/Recipe";
import style from "./recipes.module.css";

const Recipes = () => {
  const { filteredRecipes } = useSelector((state) => state);

  return (
    <div className={style.container}>
      <h3>Recipes found: {filteredRecipes.length}</h3>
      <div className={style.cardsContainer}>
        {filteredRecipes && (
          <>
            {filteredRecipes.map((recipe) => (
              <Recipe
                key={recipe.id}
                id={recipe.createdOnDB ? recipe.id : "A" + recipe.id}
                name={recipe.name}
                image={recipe.image}
                diets={recipe.diets}
                healthScore={recipe.healthScore}
                source={recipe.createdOnDB ? "DB" : "API"}
              />
            ))}
          </>
        )}
        {filteredRecipes.length === 0 && "Loading..."}
      </div>
    </div>
  );
};

export default Recipes;

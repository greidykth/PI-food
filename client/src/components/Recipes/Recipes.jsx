import React, { useState } from "react";
import { useSelector } from "react-redux";
import Recipe from "../Recipe/Recipe";
import style from "./recipes.module.css";
import { PaginationRecipes } from "../PaginationRecipes/PaginationRecipes";
import Loader from "../Loader/Loader";

const Recipes = () => {
  const { filteredRecipes, loader } = useSelector((state) => state);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(9);

  const maxPage =  Math.ceil (filteredRecipes.length / perPage);

  return (
    <div className={style.container}>
      <h3>Recipes found: {filteredRecipes.length}</h3>
      <div className={style.cardsContainer}>
        {filteredRecipes.length ? (
          <>
            {filteredRecipes.slice(
          (page - 1) * perPage,
          (page - 1) * perPage + perPage
        ).map((recipe) => (
              <Recipe
                key={recipe.id}
                id={recipe.createdOnDB ? recipe.id : "A" + recipe.id}
                name={recipe.name}
                image={recipe.image}
                diets={recipe.diets}
                healthScore={recipe.healthScore}
                source={recipe.createdOnDB ? "My recipes" : "Other recipes"}
              />
            ))}
          </>
        ) : <Loader />}
      </div>
      <PaginationRecipes page={page} setPage={setPage} maxPage={maxPage} />
    </div>
  );
};

export default Recipes;

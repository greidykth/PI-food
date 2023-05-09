import React from "react";
import { Link } from "react-router-dom";
import style from "./recipe.module.css";

const Recipe = ({ id, name, image, diets, source, healthScore }) => {
  return (
    <div className={style.recipe}>
      <div className="">
      <Link className="" to={`/recipes/${id}`}>
        <img src={image} alt={name} />
        </Link>
      </div>
      <div className={style.divInfo}>
        <h5 className={style.origin}>{source}</h5>
        <h5 className={style.healthScore}>Health score: {healthScore}</h5>
        <Link className="" to={`/recipes/${id}`}>
          <h3 className={style.name}>{name}</h3>
        </Link>
        <div className={style.divDiets}>
          {diets?.map((diet) => (
            <span className={style.spanDiet} key={diet}>{diet}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recipe;

import React from 'react'
import { Link } from 'react-router-dom'
import style from "./recipe.module.css";

const Recipe = ({id, name, image, diets, source, healthScore }) => {

  return (
    <div className={style.recipe} >
      <div className="">
      <h5 className="">{source}</h5>
      <h5 className="">Health score: {healthScore}</h5>
        <Link className="" to={`/recipes/${id}`}>
          <h3 className="">{name}</h3>
        </Link>
      </div>
      <div className="">
        <img src={image} alt={name} />
      </div>
      <div>
        {diets?.map(diet => <h5 key={diet}>{diet}</h5>)}
      </div>
    </div>
  )
}

export default Recipe

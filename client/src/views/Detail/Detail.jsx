import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import {
  cleanDetailRecipe,
  getDetailRecipe,
} from "../../redux/actions/actions";
import Loader from "../../components/Loader/Loader";

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const recipe = useSelector((state) => state.recipeDetailed);

  useEffect(() => {
    dispatch(getDetailRecipe(id));
    return () => {
      dispatch(cleanDetailRecipe());
    };
  }, [id, dispatch]);

  return (
    <div>
      Desde Detail
      <NavLink to="/home">
        <button>Go back</button>
      </NavLink>
      {recipe.name ? (
        <div>
          <h2>{id}</h2>
          <h2>{recipe.name}</h2>
          <img src={recipe.image} alt={`img_${recipe.image}`} />
          <h2>Diets</h2>
          <ul className="">
            {recipe.diets?.map((diet) => (
              <li key={diet}>{diet}</li>
            ))}
          </ul>
          <p>Summary:</p>
          <p dangerouslySetInnerHTML={{ __html: recipe.summary }}></p>
          <h2>Health Score: {recipe.healthScore}</h2>
          <h2>Method</h2>
          <ol className="">
            {recipe.procedure?.map((step) => (
              <li key={step.number}>{step.step}</li>
            ))}
          </ol>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Detail;

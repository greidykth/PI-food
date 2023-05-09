import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import {
  cleanDetailRecipe,
  getDetailRecipe,
} from "../../redux/actions/actions";
import Loader from "../../components/Loader/Loader";
import style from "./detail.module.css";
import { ReactComponent as Back } from "../../icons/tarjeta-de-direccion.svg";

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const recipe = useSelector((state) => state.recipeDetailed);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(getDetailRecipe(id));
    return () => {
      dispatch(cleanDetailRecipe());
    };
  }, [id, dispatch]);

  return (
    <div className={style.principalContainer}>
      <div className={style.container}>
        <div className={style.recipeContainer}>
          {recipe.name ? (
            <div className={style.detailDiv}>
              <img src={recipe.image} alt={`img_${recipe.image}`} />
              <div className={style.infoDetail}>
                <h3 className={style.healthScore}>
                  Health Score: {recipe.healthScore}
                </h3>
                <h4 className={style.origin}>{recipe.createdOnDB ? "My recipe" : "Other recipe"}</h4>
                <h3 className={style.id}>ID {id}</h3>
                <h2 className={style.name}>{recipe.name}</h2>
                <h3 className={style.diets}>Diets:</h3>
                <div className={style.dietsSelectedContainer}>
                  {recipe.diets?.map((diet) => (
                    <span key={diet} className={style.spanDiet}>
                      {diet}
                    </span>
                  ))}
                </div>
                <h3 className={style.summary}>Summary:</h3>
                <p dangerouslySetInnerHTML={{ __html: recipe.summary }}></p>
                <h3 className={style.method}>Method:</h3>
                <div className={style.stepsDiv}>
                  {recipe.procedure?.map((step) => (
                    <div className={style.step}>
                      <h4 className={style.stepNumber} key={step.number}>Step: {step.number}</h4>
                      <p className={style.stepParagraph}key={step.number}>{step.step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <>
              <h2>Preparing recipe...</h2>
              <div className={style.loader}>
                <Loader />
              </div>
            </>
          )}
        </div>
        <div className={style.backButtonDiv}>
          <NavLink to="/home">
            {" "}
            <Back /> Back to home
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Detail;

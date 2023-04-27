import axios from "axios";
import { GET_DETAIL_RECIPE, GET_RECIPES } from "./types_actions";

const BASE_URL = "http://localhost:3001";

export const getRecipes = () => {
    return async function (dispatch) {
      const recipes = await axios.get(BASE_URL + "/recipes");
      dispatch({
        type: GET_RECIPES,
        payload: recipes.data,
      });
    };
  };

export const getDetailRecipe = (id) => {
    return async function (dispatch) {
      const recipes = await axios.get(BASE_URL + "/recipes/" + id);
      dispatch({
        type: GET_DETAIL_RECIPE,
        payload: recipes.data,
      });
    };
  };
import axios from "axios";
import { CLEAN_DETAIL_RECIPE, FILTER_RECIPES, GET_DETAIL_RECIPE, GET_DIETS, GET_RECIPES, GET_RECIPES_BY_NAME } from "./types_actions";

const BASE_URL = "http://localhost:3001";

export const getRecipes = () => {
  return async function (dispatch) {
    const response = await axios.get(BASE_URL + "/recipes");
    dispatch({
      type: GET_RECIPES,
      payload: response.data,
    });
  };
};

export const getDetailRecipe = (id) => {
  return async function (dispatch) {
    const response = await axios.get(BASE_URL + "/recipes/" + id);
    dispatch({
      type: GET_DETAIL_RECIPE,
      payload: response.data,
    });
  };
};

export const cleanDetailRecipe = () => {
  return {
      type: CLEAN_DETAIL_RECIPE,
  };
};

export const getRecipesByName = (name) => {
  return async function (dispatch) {
    const response = await axios.get(`${BASE_URL}/recipes/?name=${name}`);
    dispatch({
      type: GET_RECIPES_BY_NAME,
      payload: response.data,
    });
  };
};

export const getDiets = () => {
  return async function (dispatch) {
    const response = await axios.get(BASE_URL + "/diets");
    dispatch({
      type: GET_DIETS,
      payload: response.data,
    });
  };
};

export const filterRecipes = (filters) => {
  return {
      type: FILTER_RECIPES,
      payload: filters,
  };
};
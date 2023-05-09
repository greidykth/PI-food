import axios from "axios";
import { CLEAN_DETAIL_RECIPE, FILTER_RECIPES, GET_DETAIL_RECIPE, GET_DIETS, GET_RECIPES, GET_RECIPES_BY_NAME, HIDE_NOTIFICATION, SHOW_NOTIFICATION } from "./types_actions";

// const BASE_URL = "http://localhost:3001";

export const getRecipes = () => {
  return async function (dispatch) {
    axios.get("/recipes").then( (response) => {
      dispatch({
        type: GET_RECIPES,
        payload: response.data,
      });
    }).catch( (error) => {
      dispatch({type: SHOW_NOTIFICATION, payload:{message: error.message, type: "error"}});
    })
    
  };
};

export const getDetailRecipe = (id) => {
  return async function (dispatch) {
    axios.get("/recipes/" + id).then( (response) => {
      dispatch({
        type: GET_DETAIL_RECIPE,
        payload: response.data,
      });
    }).catch( (error) => {
      dispatch({type: SHOW_NOTIFICATION, payload:{message: error.message, type: "error"}});
    })
   
  };
};

export const getRecipesByName = (name) => {
  return async function (dispatch) {
    axios.get(`/recipes/?name=${name}`).then( (response) => {
      dispatch({
        type: GET_RECIPES_BY_NAME,
        payload: response.data,
      });
    }).catch( (error) => {
      dispatch({type: SHOW_NOTIFICATION, payload:{message: error.message, type: "error"}});
    })
  };
};

export const cleanDetailRecipe = () => {
  return {
      type: CLEAN_DETAIL_RECIPE,
  };
};

export const getDiets = () => {
  return async function (dispatch) {
    await axios.get( "/diets").then( (response) => {
      dispatch({
        type: GET_DIETS,
        payload: response.data,
      });
    }).catch( (error) => {
      dispatch({type: SHOW_NOTIFICATION, payload:{message: error.message, type: "error"}});
    })
  };
};

export const filterRecipes = (filters) => {
  return {
      type: FILTER_RECIPES,
      payload: filters,
  };
};

export function showNotification(notification) {
  return {
    type: SHOW_NOTIFICATION,
    payload: notification
  };
}

export function hideNotification() {
  return {
    type: HIDE_NOTIFICATION,
  };
}

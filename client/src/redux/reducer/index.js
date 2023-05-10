import { orderByHealthScoreHelper, orderByNameHelper } from "../../helpers";
import {
  CLEAN_DETAIL_RECIPE,
  FILTER_RECIPES,
  GET_DETAIL_RECIPE,
  GET_DIETS,
  GET_RECIPES,
  GET_RECIPES_BY_NAME,
  HIDE_NOTIFICATION,
  SHOW_NOTIFICATION,
} from "../actions/types_actions";

const initialState = {
  allRecipes: [],
  filteredRecipes: [],
  recipeDetailed: {},
  allDiets: [],
  notification: {
    message: "",
    type: "",
  },
};

export default function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_RECIPES:
      return {
        ...state,
        allRecipes: payload,
        filteredRecipes: payload,
      };

    case GET_DETAIL_RECIPE:
      return {
        ...state,
        recipeDetailed: payload,
      };

    case CLEAN_DETAIL_RECIPE:
      return {
        ...state,
        recipeDetailed: {},
      };

    case GET_RECIPES_BY_NAME:
      return {
        ...state,
        filteredRecipes: payload,
      };

    case GET_DIETS:
      return {
        ...state,
        allDiets: payload,
      };

    case FILTER_RECIPES:
      //filter by origin
      let recipesFromDb = payload.origin.db
        ? state.allRecipes.filter((recipe) => recipe.createdOnDB)
        : [];
      let recipesFromApi = payload.origin.api
        ? state.allRecipes.filter((recipe) => !recipe.createdOnDB)
        : [];
      let filteredRecipes = [...recipesFromDb, ...recipesFromApi];

      //filter by diets
      let recipesTemporal = [];
      let recipesTemporal1 = [];
      let atLeastOne = false;
      payload.diets.forEach(diet => {
        if(diet.checked){
          atLeastOne = true;
          recipesTemporal = [...recipesTemporal, ...filteredRecipes.filter(recipe => recipe.diets.includes(diet.name))]
        }
      });
      if(atLeastOne){
        recipesTemporal.forEach(recipe => {
          if (!recipesTemporal1.find((recipeTemporal) => recipeTemporal.id === recipe.id)) {
            recipesTemporal1.push(recipe);
          }
        })
        filteredRecipes = [...recipesTemporal1];
      }

      //order by name
      if (payload.orderName !== "DEFAULT") {
        filteredRecipes = orderByNameHelper(
          [...filteredRecipes],
          payload.orderName
        );
      }

      //order by health score
      if (payload.orderHealthScore !== "DEFAULT") {
        filteredRecipes = orderByHealthScoreHelper(
          [...filteredRecipes],
          payload.orderHealthScore
        );
      }

      return {
        ...state,
        filteredRecipes,
      };

      case SHOW_NOTIFICATION:
      return {
        ...state,
        notification: payload
      };

      case HIDE_NOTIFICATION:
      return {
        ...state,
        notification: initialState.notification
      };

    default:
      return { ...state };
  }
}

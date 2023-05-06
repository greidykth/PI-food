import { filterByDietHelper, orderByHealthScoreHelper, orderByNameHelper } from "../../helpers";
import {
  CLEAN_DETAIL_RECIPE,
  FILTER_RECIPES,
  GET_DETAIL_RECIPE,
  GET_DIETS,
  GET_RECIPES,
  GET_RECIPES_BY_NAME,
} from "../actions/types_actions";

const initialState = {
  allRecipes: [],
  filteredRecipes: [],
  recipeDetailed: {},
  allDiets: [],
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
      payload.diets.forEach(diet => {
        if(diet.checked)
          recipesTemporal = [...recipesTemporal, ...filteredRecipes.filter(recipe => recipe.diets.includes(diet.name))]
      });
      recipesTemporal.forEach(recipe => {
        if (!recipesTemporal1.find((recipeTemporal) => recipeTemporal.id === recipe.id)) {
          recipesTemporal1.push(recipe);
        }
      })
      filteredRecipes = [...recipesTemporal1];
      // filteredRecipes = filterByDietHelper([...filteredRecipes], payload.diets);
      

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



      return {
        ...state,
        filteredRecipes: filteredRecipes,
      };

    default:
      return { ...state };
  }
}

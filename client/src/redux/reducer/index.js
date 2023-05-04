import {
  CLEAN_DETAIL_RECIPE,
  GET_DETAIL_RECIPE,
  GET_DIETS,
  GET_RECIPES,
  GET_RECIPES_BY_NAME,
} from "../actions/types_actions";

const initialState = {
  allRecipes: [],
  recipeDetailed: {},
  allDiets: [],
};

export default function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_RECIPES:
      return {
        ...state,
        allRecipes: payload,
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
        allRecipes: payload,
      };

    case GET_DIETS:
      return {
        ...state,
        allDiets: payload,
      };

    default:
      return { ...state };
  }
}

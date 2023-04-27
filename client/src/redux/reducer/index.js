import { GET_DETAIL_RECIPE, GET_RECIPES } from "../actions/types_actions";

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

    default:
      return { ...state };
  }
}

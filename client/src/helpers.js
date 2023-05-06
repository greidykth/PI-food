export const filterByDietHelper = (arr, parameter) => {
    
  let recipesTemporal = [];
  let recipesTemporal1 = [];

      parameter.forEach(diet => {
        if(diet.checked)
          recipesTemporal = [...recipesTemporal, arr.filter(recipe => recipe.diets.includes(diet.name))]
      });
      recipesTemporal.forEach(recipe => {
        if (!recipesTemporal1.find((recipeTemporal) => recipeTemporal.id === recipe.id)) {
          recipesTemporal1.push(recipe);
        }
      })
      
      return [...recipesTemporal1];

}

export const orderByNameHelper = (arr, parameter) => {
    const newOrder = arr.sort((a, b) => {
        if (a.name > b.name) {
          return "ASC" === parameter ? 1 : -1;
        }
        if (a.name < b.name) {
          return "DESC" === parameter ? 1 : -1;
        }
        return 0;
      });
    return newOrder;
}

export const orderByHealthScoreHelper = (arr, parameter) => {
    const newOrder = arr.sort((a, b) => {
        if (a.healthScore > b.healthScore) {
          return "ASC" === parameter ? 1 : -1;
        }
        if (a.healthScore < b.healthScore) {
          return "DESC" === parameter ? 1 : -1;
        }
        return 0;
      });
    return newOrder;
}
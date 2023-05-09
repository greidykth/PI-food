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
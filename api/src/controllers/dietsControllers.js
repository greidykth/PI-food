const { Diet } = require("../db");
const { getRecipesFromApi } = require("./recipesControllers");

const getDietsFromDb = async () => {
  const diets = await Diet.findAll();
  return diets;
};

const getDietsFromApi = async () => {
  try {
    const recipes = await getRecipesFromApi();
    let dietsFromApi = recipes.map((recipe) => recipe.diets).flat();
    
    dietsFromApi.push("vegan", "vegetarian", "gluten free")
    dietsFromApi = [...new Set(dietsFromApi)]; //Elimina registros repetidos del array
    
    const diets = dietsFromApi.map((diet) => {
      return { name: diet };
    });

    storeDiets(diets);
  } catch (error) {
    console.log("Error during store diets, ", error.message);
  }
};

const storeDiets = async (diets) => {
    await Diet.bulkCreate(diets);
    console.log("Diets created successfully");
};

module.exports = {
  getDietsFromDb,
  getDietsFromApi,
};

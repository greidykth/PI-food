const { Op } = require("sequelize");
const { Recipe, Diet } = require("../db");
const axios = require("axios");

const { API_KEY, URL_GET_RECIPES, URL_GET_DETAIL_RECIPE } = process.env;

const getRecipes = async () => {
  const recipesApi = await getRecipesFromApi();

  const recipesDbWithDiets = await getRecipesFromDb();

  return { recipesFromApi: recipesApi, recipesFromDb: recipesDbWithDiets };
};

const getRecipesFromApi = async () => {
  const numberResults = 1;
  const results = await axios.get(
    `${URL_GET_RECIPES}?apiKey=${API_KEY}&addRecipeInformation=true&number=${numberResults}`
  );

  const recipesApi = results.data.results.map((recipe) => {
    return {
      id: recipe.id,
      name: recipe.title,
      image: recipe.image,
      diets: setDietsApi(
        recipe.diets,
        recipe.vegetarian,
        recipe.vegan,
        recipe.glutenFree
      ),
    };
  });

  return recipesApi;
};

const getRecipesFromDb = async () => {
  const recipesDb = await Recipe.findAll({
    include: [
      {
        model: Diet,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    ],
    attributes: ["id", "name", "image"],
    order: [["createdAt", "DESC"]],
  });

  const recipes = recipesDb.map((recipe) => {
    return {
      id: recipe.id,
      name: recipe.name,
      image: recipe.image,
      diets: setDietsDB(recipe.diets),
    };
  });

  return recipes;
};

const getRecipesByName = async (name) => {
  if (!name) throw new Error("The name is required");

  let recipesApi = await getRecipesFromApi();

  recipesApi = recipesApi.filter((recipe) =>
    recipe.name.toLowerCase().includes(name.toLowerCase())
  );

  const recipesDb = await Recipe.findAll({
    where: {
      name: {
        [Op.iLike]: `%${name}%`,
      },
    },
    attributes: ["id", "name", "image"],
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: Diet,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    ],
  });

  const recipesDbCleaned = recipesDb.map((recipe) => {
    return {
      id: recipe.id,
      name: recipe.name,
      image: recipe.image,
      diets: setDietsDB(recipe.diets),
    };
  });
  return { recipesFromApi: recipesApi, recipesFromDb: recipesDbCleaned };
};

const getRecipeById = async (idRecipe) => {
  if (!idRecipe) throw new Error("The id recipe is required");

  let recipe = {};

  if (idRecipe.startsWith("A")) {
    //Buscar id en api
    const result = await axios.get(
      `${URL_GET_DETAIL_RECIPE}/${idRecipe.slice(
        1
      )}/information?apiKey=${API_KEY}`
    );

    if (result.data.id) {
      recipe = {
        id: result.data.id,
        name: result.data.title,
        image: result.data.image,
        summary: result.data.summary,
        healthScore: result.data.healthScore,
        diets: setDietsApi(
          result.data.diets,
          result.data.vegetarian,
          result.data.vegan,
          result.data.glutenFree
        ),
        procedure: result.data.analyzedInstructions[0].steps.map((step) => ({
          number: step.number,
          step: step.step,
        })),
      };
    } else {
      throw new Error("Recipe not found");
    }
  } else {
    //Buscar id en base de datos
    const recipeDB = await Recipe.findByPk(idRecipe, {
      include: [
        {
          model: Diet,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      ],
    });

    if (!recipeDB) {
      throw new Error("Recipe not found");
    } else {
      recipe = {
        id: recipeDB.id,
        name: recipeDB.name,
        image: recipeDB.image,
        summary: recipeDB.summary,
        healthScore: recipeDB.healthScore,
        procedure: recipeDB.procedure,
        diets: setDietsDB(recipeDB.diets),
      };
    }
  }

  return recipe;
};

const setDietsApi = (diets, vegetarian, vegan, glutenFree) => {
  let dietsRecipe = [...diets];

  if (vegetarian && !diets.includes("vegetarian"))
    dietsRecipe.push("vegetarian");

  if (vegan && !diets.includes("vegan")) dietsRecipe.push("vegan");

  if (glutenFree && !diets.includes("gluten free"))
    dietsRecipe.push("gluten free");

  return dietsRecipe;
};

const setDietsDB = (diets) => {
  return diets.map((diet) => diet.name);
};

const createRecipe = async (
  name,
  image,
  summary,
  healthScore,
  procedure,
  diets
) => {
  if (![name, image, summary, healthScore, procedure, diets].every(Boolean)) {
    throw Error("Missing data for recipe");
  }
  const newRecipe = await Recipe.create({
    name,
    image,
    summary,
    healthScore,
    procedure,
  });
  //agregar diets
  await newRecipe.addDiets(diets);
  return newRecipe;
};

module.exports = {
  getRecipes,
  getRecipeById,
  createRecipe,
  getRecipesByName,
  getRecipesFromApi,
};

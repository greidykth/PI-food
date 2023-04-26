const { Router } = require("express");
const { getRecipes, getRecipeById, createRecipe, getRecipesByName } = require("../controllers/recipesControllers");
const { STATUS_OK, STATUS_BAD_REQUEST } = require("../utils/const_status");


const recipesRoutes = Router();


recipesRoutes.get("/", async (req, res) => {
  //Obtener las primeras 100 recetas de la api y las de la base de datos

  const { name } = req.query;
  let recipes;
  try {
    if(name) {
      //buscar por name
      recipes = await getRecipesByName(name);      
    } else {
      recipes = await getRecipes();
    }
    res.status(STATUS_OK).json(recipes);
  } catch (error) {
    res.status(STATUS_BAD_REQUEST).json({ error: error.message });
  }
});

recipesRoutes.get("/:id", async (req, res) => {
  //Obtener el detalle de una receta
  const { id } = req.params;

  try {
    const recipe = await getRecipeById(id)
    res.status(STATUS_OK).json(recipe);
  } catch (error) {
    res.status(STATUS_BAD_REQUEST).json({ error: error.message });
  }
});

recipesRoutes.post("/", async (req, res) => {
  //Crear nueva receta

  const { name, image, summary, healthScore, procedure, diets } = req.body;

  try {
    const newRecipe = await createRecipe(name, image, summary, healthScore, procedure, diets)
    res.status(STATUS_OK).json(newRecipe);
  } catch (error) {
    res.status(STATUS_BAD_REQUEST).json({ error: error.message });
  }
});

module.exports = recipesRoutes;

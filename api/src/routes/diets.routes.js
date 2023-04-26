const { Router } = require("express");
const { getDietsFromDb } = require("../controllers/dietsControllers");
const { STATUS_OK, STATUS_BAD_REQUEST } = require("../utils/const_status");

const dietsRoutes = Router();

dietsRoutes.get("/", async (req, res) => {
  try {
    const diets = await getDietsFromDb() 
    res.status(STATUS_OK).json(diets);
  } catch (error) {
    res.status(STATUS_BAD_REQUEST).json({ error: error.message });
  }
});


module.exports = dietsRoutes;
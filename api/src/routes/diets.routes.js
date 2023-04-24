const { Router } = require("express");

const dietsRoutes = Router();

dietsRoutes.get("/", async (req, res) => {
  res.status(200).json("Desde diets");
});

module.exports = dietsRoutes;
const { Router } = require("express");

const recipesRoutes = Router();

recipesRoutes.get("/", async (req, res) => {
  res.status(200).json("Desde recipes");
});

module.exports = recipesRoutes;

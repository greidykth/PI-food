const { Router } = require('express');
const recipesRoutes = require('./recipes.routes');
const dietsRoutes = require('./diets.routes');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// router.get('/', (req, res) => {
//     res.json({ message : "Welcome to food api" })
// })
router.use('/recipes', recipesRoutes)
router.use('/diets', dietsRoutes);

module.exports = router;

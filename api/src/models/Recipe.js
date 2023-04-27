const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    healthScore: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    procedure: {
      type: DataTypes.ARRAY(DataTypes.JSON),
    allowNull: false,
    }
  },
  {
    getterMethods: {
      async allDiets() {
        const recipe = this.toJSON();
        const diets = await this.getDiets();
        recipe.diets = diets.map((diet) => diet.name);
        return recipe;
      },
    }}
  )
};











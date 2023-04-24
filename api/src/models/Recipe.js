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
    dishSummary: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    healthScore: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    procedure: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });
};











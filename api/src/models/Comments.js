const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("comments", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    providerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      //Fecha y hora
      type: DataTypes.STRING,
      allowNull: false,
    },
    stats: {
      type: DataTypes.FLOAT,
    },
  });
};

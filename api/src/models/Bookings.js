const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("bookings", {
    courtId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    /* availableId: {
      type: DataTypes.STRING,
      allowNull: false,
    }, */
    bookingCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};

// {
//   horarios: [{}, {}, {}]; // franja horaria de trabajo del proveedor en tal dia
//   reservas: [{}, {}, {}]; // con las bookings de una cancha en tal dia
// }

require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require('fs');
const path = require('path');
const { dbUser, dbHost, dbPassword, dbName } = require("./Config/config");


/* const UserModel = require("../models/User");
const ProveedorModel = require("../models/Proveedor");
const AvailableModel = require("../models/Available");
const FieldModel = require("../models/Field"); */

const sequelize = new Sequelize(
  `postgres://${dbUser}:${dbPassword}@${dbHost}/${dbName}`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { User, Proveedor, Field, Available } = sequelize.models;

/* const User = UserModel(sequelize);
const Proveedor = ProveedorModel(sequelize);
const Available = AvailableModel(sequelize);
const Field = FieldModel(sequelize);
console.log(UserModel) */
// --------------------------- Relaciones ---------------------------------//
// Recipe.belongsToMany(Diet, { through: "intermediateTable" }); // Relacion de muchos a muchos con la taabla intermedia "intermediateTable"
// Diet.belongsToMany(Recipe, { through: "intermediateTable" }); // Relacion de muchos a muchos con la taabla intermedia "intermediateTable"

module.exports = {
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
  User,
  Proveedor,
  Available,
  Field,
};

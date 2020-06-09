const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");

const basename = path.basename(module.filename);
const db = {};
require("dotenv").config();
const _ = require("lodash");
const appConfig = require("../config/config.json");

const defaultConfig = appConfig.development;
const environment = process.env.NODE_ENV || "development";
const environmentConfig = appConfig[environment];
const finalConfig = _.merge(defaultConfig, environmentConfig);

const sequelize = new Sequelize(
  finalConfig.database,
  finalConfig.username,
  finalConfig.password,
  finalConfig.sequelizeConfig
);

fs.readdirSync(__dirname)
  .filter(function(file) {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach(function(file) {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].loadScopes) {
    db[modelName].loadScopes(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const dataSql = fs.readFileSync(__dirname + '/../data/proc-stock/matching.sql').toString();
const dotenv = require('dotenv');
dotenv.config();
const { users } = require('../data/AppUser.data');
const { typePreference } = require('../data/TypePreference.data');
const { preference } = require('../data/Preference.data');
const { like } = require('../data/Like.data');
const { game } = require('../data/Game.data');
const { typeGame } = require('../data/TypeGame.data');

const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;

    // This function update the database at every start of the node server.
    async function initDb() {
    // Regen the database table
    await sequelize.sync({ force: true });
    // Fill the app_user table
    await db.AppUser.bulkCreate(users);
    //Fill the type_preference table
    await db.TypePreference.bulkCreate(typePreference);
    // Fill the preference table
    await db.Preference.bulkCreate(preference);
    // Fill the preference table
    await db.Like.bulkCreate(like);
    // Fill the type_game table
    await db.TypeGame.bulkCreate(typeGame);
    // Fill the games table
    await db.Game.bulkCreate(game);
    // Add the storedProc
    await db.sequelize.query(dataSql)
 }

 initDb().then(() => {
   // if display then everything went good.
   console.log('Everything OK');
 }).catch(e => {
   // display the error encounter
   console.log('Error : ' + e);
 });

module.exports = db;

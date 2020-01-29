'use strict';

module.exports = (sequelize, DataTypes) => {
  const Game = sequelize.define('Game', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING
    },
    url: {
        type: DataTypes.STRING
    }

  }, {
    freezeTableName: true,
    //timestamps: true,
    createdAt: false,
    updatedAt: false,
  });
  Game.associate = function (models) {
    // associations can be defined here
  };
  return Game;
};

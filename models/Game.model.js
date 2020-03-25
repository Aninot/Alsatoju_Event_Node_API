'use strict';

module.exports = (sequelize, DataTypes) => {
  const Game = sequelize.define('Game', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    creatorId: {
      type: DataTypes.INTEGER,
      references:{
        model: 'app_user',
        key : 'id'
      }
    },
    challengedId: {
      type: DataTypes.INTEGER,
      references:{
        model: 'app_user',
        key: 'id'
      }
    },
    gameType: {
      type: DataTypes.INTEGER,
      references:{
          model: 'type_games',
          key: 'typeGamesId'
      },
    },
    scoreCreator: {
      type: DataTypes.STRING,
    },
    scoreChallenged: {
      type: DataTypes.STRING,
    }
  }, {
    freezeTableName: true,
    //timestamps: true,
    createdAt: false,
    updatedAt: false,
    underscored: true,
  });
  Game.associate = function (models) {
    // associations can be defined here
  };
  return Game;
};

'use strict';

module.exports = (sequelize, DataTypes) => {
  const Matching = sequelize.define('Matching', {
    idUserOne: {
      type: DataTypes.INTEGER,
      references:{
        model: 'app_user',
        key : 'id'
      }
    },
    idUserTwo: {
      type: DataTypes.INTEGER,
      references:{
        model: 'app_user',
        key : 'id'
      }
    },
    responseUserOne: {
      type: DataTypes.BOOLEAN
    },
    responseUserTwo: {
      type: DataTypes.BOOLEAN
    }
  }, {
    freezeTableName: true,
    //timestamps: true,
    createdAt: false,
    updatedAt: false,
    underscored: true,
  });
  Matching.associate = function (models) {
    // associations can be defined here
  };
  return Matching;

};



'use strict';

module.exports = (sequelize, DataTypes) => {
  const Matching = sequelize.define('Matching', {
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

    // Matching.hasOne(models.AppUser, { as: 'idUserOne' });
    // Matching.hasOne(models.AppUser, { as: 'idUserTwo' });
  };
  return Matching;

};



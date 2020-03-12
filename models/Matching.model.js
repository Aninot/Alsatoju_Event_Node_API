'use strict';

module.exports = (sequelize, DataTypes) => {
  const Matching = sequelize.define('Matching', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
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
    Matching.belongsTo(models.AppUser, { as : 'UserOne'});
    Matching.belongsTo(models.AppUser, { as : 'UserTwo'});
  };
  return Matching;

};
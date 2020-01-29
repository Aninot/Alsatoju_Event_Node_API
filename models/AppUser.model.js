'use strict';
module.exports = (sequelize, DataTypes) => {
  const AppUser = sequelize.define('AppUser', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING
    },
  }, {
    tableName: 'app_user',
    sequelize,
    freezeTableName: true,
    indexes: [
      { unique: true, fields: ['email'] },
    ],
    underscored: true,
  });

  AppUser.associate = function (models) {
    // associations can be defined here
  };
  return AppUser;
};
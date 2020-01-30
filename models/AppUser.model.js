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
    firstName: {
      type: DataTypes.STRING
    },
    lastName: {
      type: DataTypes.STRING
    },
    //TODO voir pour faire des énums pour genre/orientation etc
    gender: {
      type: DataTypes.STRING
    },
    sexuality: {
      type: DataTypes.STRING
    },
    avatar: {
      type: DataTypes.STRING
    },
    pseudo: {
      type: DataTypes.STRING
    },
    minAge: {
      type: DataTypes.INTEGER
    },
    maxAge: {
      type: DataTypes.INTEGER
    },
    length: {
      type: DataTypes.INTEGER
    },
    description: {
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
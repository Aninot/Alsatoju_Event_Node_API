'use strict';
module.exports = (sequelize, DataTypes) => {
  const AppUser = sequelize.define('app_user', {
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
    sequelize,
    modelName: 'AppUser',
    freezeTableName: true,
    indexes: [
      { unique: true, fields: ['email'] },
    ],
    underscored: true,
    // timestamps: true,
    // createdAt: true,
    // updatedAt: true,
  });

  AppUser.associate = function (models) {
    // associations can be defined here
  };
  return AppUser;
};
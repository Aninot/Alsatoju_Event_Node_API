'use strict';

module.exports = (sequelize, DataTypes) => {
  const TypePreference = sequelize.define('TypePreference', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    type: {
      type: DataTypes.STRING
    },

  }, {
  tableName:'type_preference'
    freezeTableName: true,
    //timestamps: true,
    createdAt: false,
    updatedAt: false,
    underscored: true,
  });
  TypePreference.associate = function (models) {
    // associations can be defined here
  };
  return TypePreference;

};

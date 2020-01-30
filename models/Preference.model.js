'use strict';

module.exports = (sequelize, DataTypes) => {
  const Preference = sequelize.define('Preference', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    typeId: {
      type: DataTypes.INTEGER,
      references:{
        model: 'TypePreference',
        key : 'id'
      }
    },
    style: {
        type: DataTypes.STRING
    }

  }, {
    freezeTableName: true,
    //timestamps: true,
    createdAt: false,
    updatedAt: false,
  });
  Preference.associate = function (models) {
    // associations can be defined here
  };
  return Preference;

};



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
    gender: {
      type: DataTypes.STRING
    },
    // orientation sexuelle
    sexualityPref: {
      type: DataTypes.STRING
    },
    avatar: {
      type: DataTypes.STRING
    },
    username: {
      type: DataTypes.STRING
    },
    ageTargeted: {
      type: DataTypes.STRING
    },
    heightInCentimeter: {
      type: DataTypes.INTEGER
    },
    // Stockage de la note vocale
    description: {
      type: DataTypes.STRING
    },
    // Diametre de recherche de profils
    positionRange: {
      type: DataTypes.INTEGER
    },
    geoLocPosition: {
      type: DataTypes.STRING
    }
  }, {
    tableName: 'app_user',
    sequelize,
    freezeTableName: true,
    indexes: [{
        unique: true,
        fields: ['email']
      },
    ],
    underscored: true,
  });

  // This function is used to not serialize the password.
  AppUser.prototype.toJSON = function () {
    var values = Object.assign({}, this.get());
    delete values.password;
    return values;
  };

  AppUser.associate = function (models) {
    // associations can be defined here
  };

  return AppUser;
};
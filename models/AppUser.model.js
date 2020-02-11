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
    //TODO: voir pour faire des énums pour genre/orientation etc
    gender: {
      type: DataTypes.STRING
    },
    // orientation sexuelle
    sexuality: {
      type: DataTypes.STRING
    },
    sexualityPref: {
      type: DataTypes.STRING
    },
    avatar: {
      type: DataTypes.STRING
    },
    username: {
      type: DataTypes.STRING
    },
    // *AL* TODO: le min est le max peut etre remplacer par une string 'min-max' ou min est max sont les valeurs min et max.
    // Ainsi avec un explode on récupère notre information et cela permet d'avoir moins de colonne.
    // ageSearch : { type: DataTypes.STRING(7) }
    // varchar de 7 caractères max.
    // *TA* -> Voir avec Julien
    minAge: {
      type: DataTypes.INTEGER
    },
    maxAge: {
      type: DataTypes.INTEGER
    },
    // *JF* A changer pour size non ? et je parle pas de la taille de sa b***
    length: { // en centimetre
      type: DataTypes.INTEGER(3)
    },
    // *AL* Je croyais qu'il n'y avait pas de saisi de l'utilisateur ?
    // *TA* -> C'est le vocal, mais en attendant de savoir le stocker je l'ai mis en STRING pour faciliter les échantes
    description: {
      type: DataTypes.STRING
    },
    // *JU* Diametre de recherche de profils
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
    }, ],
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
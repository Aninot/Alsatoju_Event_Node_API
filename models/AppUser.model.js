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
    // J'imagine que c'est l'orientation ?
    sexuality: {
      type: DataTypes.STRING
    },
    avatar: {
      type: DataTypes.STRING
    },
    // username fait plus de sens pour moi mais ce n'est qu'un détail que l'on peut discuter et laisser comme Thomas l'a fait.
    pseudo: {
      type: DataTypes.STRING
    },
    // TODO: le min est le max peut etre remplacer par une string 'min-max' ou min est max sont les valeurs min et max.
    // Ainsi avec un explode on récupère notre information et cela permet d'avoir moins de colonne.
    // ageSearch : { type: DataTypes.STRING(7) }
    // varchar de 7 caractères max.
    minAge: {
      type: DataTypes.INTEGER
    },
    maxAge: {
      type: DataTypes.INTEGER
    },
    // en cm ou m ? car si m alors float (1.70 par exemple) , si cm pas de problème (170)
    length: {
      type: DataTypes.INTEGER
    },
    // Je croyais qu'il n'y avait pas de saisi de l'utilisateur ?
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
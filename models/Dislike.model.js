'use strict';

module.exports = (sequelize, DataTypes) => {
  const Dislike = sequelize.define('Dislike', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    userId: {
      type: DataTypes.INTEGER,
      references:{
        model: 'app_user',
        key : 'id'
      }
    },
    preference: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Preference',
            key : 'id'
        }
    }
  }, {
    freezeTableName: true,
    //timestamps: true,
    createdAt: false,
    updatedAt: false,
    underscored: true,
  });
  Dislike.associate = function (models) {
    // associations can be defined here
  };
  return Dislike;

};



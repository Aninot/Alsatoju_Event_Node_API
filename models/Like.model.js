'use strict';

module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
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
    // *AL* On s'est pas du tout compris la dessus, pour moi c'est pas du tout scalable ce que tu as fais au niveau de ce model
    // *TA* -> j'avais fumé, la fatigue sans doute... C'est corrigé
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
  Like.associate = function (models) {
    // associations can be defined here
  };
  return Like;

};



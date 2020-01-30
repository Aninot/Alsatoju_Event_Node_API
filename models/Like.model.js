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
        model: 'AppUser',
        key : 'id'
      }
    },
    filmPreference: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Preference',
            key : 'id'
        }
    },
    musicPreference: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Preference',
            key : 'id'
        }
    },
    otherPreference: {
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
  });
  Like.associate = function (models) {
    // associations can be defined here
  };
  return Like;

};



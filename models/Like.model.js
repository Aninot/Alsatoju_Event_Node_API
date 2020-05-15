'use strict'

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
      references: {
        model: 'app_user',
        key: 'id'
      }
    },
    preference: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Preference',
        key: 'id'
      }
    }
  }, {
    freezeTableName: true,
    // timestamps: true,
    createdAt: false,
    updatedAt: false,
    underscored: true
  })
  Like.associate = function (models) {
    // associations can be defined here
  }
  return Like
}

'use strict'

module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
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
    Like.belongsTo(models.AppUser, { as: 'user', target: 'user' })
    Like.belongsTo(models.Preference, { as: 'preference', target: 'preference' })
  }
  return Like
}

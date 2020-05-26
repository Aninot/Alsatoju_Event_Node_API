'use strict'

module.exports = (sequelize, DataTypes) => {
  const Preference = sequelize.define('Preference', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER

    },
    style: {
      type: DataTypes.STRING
    }
  }, {
    freezeTableName: true,
    // timestamps: true,
    createdAt: false,
    updatedAt: false,
    underscored: true
  })
  Preference.associate = function (models) {
    // associations can be defined here
    Preference.belongsTo(models.TypePreference, { as: 'preferenceType', target: 'type', foreignKey: 'typeId' })
  }
  return Preference
}

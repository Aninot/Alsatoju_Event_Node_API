'use strict'

module.exports = (sequelize, DataTypes) => {
  const Matching = sequelize.define('Matching', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    responseUserOne: {
      type: DataTypes.BOOLEAN
    },
    responseUserTwo: {
      type: DataTypes.BOOLEAN
    },
    // gameId: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: 'game',
    //     key: 'id'
    //   },
    //   unique: true,
    // }
  }, {
    freezeTableName: true,
    // timestamps: true,
    createdAt: false,
    updatedAt: false,
    underscored: true
  })

  Matching.prototype.toJSON = function () {
    var values = Object.assign({}, this.get())
    delete values.password
    delete values.UserOneId
    delete values.UserTwoId
    return values
  }

  Matching.associate = function (models) {
    // associations can be defined here
    Matching.belongsTo(models.AppUser, {
      as: 'UserOne'
    })
    Matching.belongsTo(models.AppUser, {
      as: 'UserTwo'
    })
  }

  return Matching
}
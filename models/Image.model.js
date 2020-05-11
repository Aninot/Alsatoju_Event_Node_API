'use strict';

module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    type: {
      type: DataTypes.STRING
    },
    name: {
      type: DataTypes.STRING
    },
    data: {
      type: DataTypes.BLOB
    },
    user: {
      type: DataTypes.INTEGER,
      references: {
        model: 'app_user',
        key: 'id'
      },
      unique: true,
      allowNull: false,
    }
  }, {
    tableName: 'image',
    freezeTableName: true,
    timestamps: true,
    createdAt: false,
    updatedAt: false,
    underscored: true,
  });
  Image.associate = function (models) {
    // associations can be defined here
  };
  return Image;
};

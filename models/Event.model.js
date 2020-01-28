'use strict';

module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING
    },
    address: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    price: {
      type: DataTypes.STRING
    },
    img: {
      type: DataTypes.STRING
    },
    baseURL: {
      type: DataTypes.STRING
    },
    tags: {
      type: DataTypes.STRING
    },
    start: {
      type: DataTypes.STRING
    },
    end: {
      type: DataTypes.STRING
    },
    location: {
      type: DataTypes.STRING
    }
  }, {
    modelName: 'Event',
    freezeTableName: true,
    timestamps: true,
    createdAt: true,
    updatedAt: true,
  });
  Event.associate = function (models) {
    // associations can be defined here
  };
  return Event;
};

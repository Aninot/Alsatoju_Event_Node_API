'use strict';

module.exports = (sequelize, DataTypes) => {
    const TypeGame = sequelize.define('TypeGame', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        type: {
            type: DataTypes.STRING
        },
        template: {
            type: DataTypes.INTEGER
        },
    }, {
        tableName: 'type_game',
        freezeTableName: true,
        //timestamps: true,
        createdAt: false,
        updatedAt: false,
        underscored: true,
    });
    TypeGame.associate = function (models) {
        // associations can be defined here
    };

    return TypeGame;
};

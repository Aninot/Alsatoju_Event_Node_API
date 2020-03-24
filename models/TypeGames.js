'use strict';

module.exports = (sequelize, DataTypes) => {
    const TypeGames = sequelize.define('TypeGames', {
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
            type: DataTypes.INT
        },
    }, {
        tableName: 'type_games',
        freezeTableName: true,
        //timestamps: true,
        createdAt: false,
        updatedAt: false,
        underscored: true,
    });
    TypePreference.associate = function (models) {
        // associations can be defined here
    };

    return TypeGames;
};

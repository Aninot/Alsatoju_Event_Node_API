'use strict';

module.exports = (sequelize, DataTypes) => {
    const Score = sequelize.define('Score', {
        scoreId: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        gameType: {
            type: DataTypes.INTEGER,
            references:{
                model: 'games_type',
                key: 'id'
            },
        }
    }, {
        freezeTableName: true,
        //timestamps: true,
        createdAt: false,
        updatedAt: false,
        underscored: true,
    });
    Game.associate = function (models) {
        // associations can be defined here
    };
    return Game;
};

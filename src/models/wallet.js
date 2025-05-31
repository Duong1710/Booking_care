'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Wallet extends Model {
        static associate(models) {
            Wallet.belongsTo(models.User, {
                foreignKey: 'userId',
                as: 'user'
            });
        }
    }

    Wallet.init({
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        balance: {
            type: DataTypes.DECIMAL(10, 2),
            defaultValue: 0
        },
        currency: {
            type: DataTypes.STRING,
            defaultValue: 'VND'
        },
        status: {
            type: DataTypes.ENUM('active', 'frozen'),
            defaultValue: 'active'
        }
    }, {
        sequelize,
        modelName: 'Wallet',
    });

    return Wallet;
}; 
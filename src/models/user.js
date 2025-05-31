'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.hasOne(models.Wallet, {
                foreignKey: 'userId',
                as: 'wallet'
            });
        }
    }

    User.init({
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: [3, 20]
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6, 100]
            }
        },
        fullName: DataTypes.STRING,
        phoneNumber: {
            type: DataTypes.STRING,
            validate: {
                is: /^[0-9]{10}$/
            }
        },
        dateOfBirth: DataTypes.DATE,
        gender: {
            type: DataTypes.ENUM('male', 'female', 'other'),
            defaultValue: 'other'
        },
        address: DataTypes.STRING,
        status: {
            type: DataTypes.ENUM('active', 'inactive', 'banned'),
            defaultValue: 'active'
        },
        role: {
            type: DataTypes.ENUM('user', 'admin'),
            defaultValue: 'user'
        }
    }, {
        sequelize,
        modelName: 'User',
        hooks: {
            beforeCreate: async (user) => {
                user.password = await bcrypt.hash(user.password, 10);
            },
            beforeUpdate: async (user) => {
                if (user.changed('password')) {
                    user.password = await bcrypt.hash(user.password, 10);
                }
            }
        }
    });

    return User;
};
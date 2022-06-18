const { DataTypes } = require('sequelize')
const sequelize = require('../../connection');

const User = sequelize.define('User', {
    Address: {
        type: DataTypes.STRING(45),
        allowNull: false,
        primaryKey: true,
    },
    Email: {
        type: DataTypes.STRING(45),
        allowNull: true,
    },
    CreatedAt: {
        type: DataTypes.DATE,
        default: false,
    },
    UpdatedAt: {
        type: DataTypes.DATE,
        default: false,
    }
}, {
    tableName: 'user',
    timestamps: false,
})

module.exports = User
const { DataTypes } = require('sequelize')
const sequelize = require('../../connection');

const Whitelist = sequelize.define('Whitelist', {
    PoolAddress: {
        type: DataTypes.STRING(45),
        allowNull: false,
        primaryKey: true,
    },
    UserAddress: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    MaxAmount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Status: {
        type: DataTypes.STRING(20),
        default: false,
    },
}, {
    tableName: 'whitelist',
    timestamps: true,
})

module.exports = Whitelist
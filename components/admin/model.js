const { DataTypes } = require('sequelize');
const sequelize = require('../../connection');

const Admin = sequelize.define('Admin', {
    Username: {
        type: DataTypes.STRING(45),
        allowNull: false,
        primaryKey: true,
    },
    Password: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    Name: {
        type: DataTypes.STRING(60),
        allowNull: false,
    },
    IsDeleted: {
        type: DataTypes.BOOLEAN,
        default: false,
    }
}, {
    tableName: 'admin',
    timestamps: false,
})

module.exports = Admin
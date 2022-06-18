const { DataTypes } = require('sequelize')
const sequelize = require('../../connection');

const Project = sequelize.define('Project', {
    PoolAddress: {
        type: DataTypes.STRING(45),
        allowNull: false,
        primaryKey: true,
    },
    Name: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    Description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    Website: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    Whitepaper: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    Twitter: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    Telegram: {
        type: DataTypes.STRING(200),
        allowNull: true,
    },
    Github: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    Medium: {
        type: DataTypes.STRING(200),
        allowNull: true,
    },
    StakeAddress: {
        type: DataTypes.STRING(45),
        allowNull: true,
    },
    TokenAddress: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    OwnerAddress: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    SignerAddress: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    LogoUrl: {
        type: DataTypes.STRING(300),
        allowNull: false,
    },
    BeginTime: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    EndTime: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    MoneyRaise: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    ChainId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    WhitelistBegin: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    WhitelistEnd: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    WhitelistLink: {
        type: DataTypes.STRING(300),
        allowNull: false,
    },
    CreatedAt: {
        type: DataTypes.DATE,
        default: false,
    },
    UpdatedAt: {
        type: DataTypes.DATE,
        default: false,
    },
}, {
    tableName: 'project',
    timestamps: false,
})

module.exports = Project
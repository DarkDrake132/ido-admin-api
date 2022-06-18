const { DataTypes } = require('sequelize');
const sequelize = require('../../connection');

const AppliedProject = sequelize.define('AppliedProject', {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    PersonalName: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    PersonalEmail: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    PersonalTelegram: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    ProjectName: {
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
    Twitter: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    Telegram: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    ChainId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    DevelopmentState: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    Whitepaper: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    Tokenomic: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    BeforeRaise: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    TotalRaise: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Status: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        default: false,
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
    tableName: 'applied_project',
    timestamps: false,
})

module.exports = AppliedProject
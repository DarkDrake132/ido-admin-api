const { Sequelize } = require("sequelize")
require('dotenv').config();
const {
    DATABASE_HOST_URI,
    DATABASE_NAME,
    DATABASE_USERNAME,
    DATABASE_PASSWORD,
} = process.env

const sequelize = new Sequelize(
    DATABASE_NAME,
    DATABASE_USERNAME,
    DATABASE_PASSWORD,
    {
        host: DATABASE_HOST_URI,
        dialect: "mysql",
    }
)

sequelize
    .authenticate()
    .then(() => console.log("Connection has been established successfully."))
    .catch((e) => console.error("Unable to connect to the database:", e))

module.exports = sequelize

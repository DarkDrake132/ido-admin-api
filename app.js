const express = require("express")
const cookieParser = require("cookie-parser")
const logger = require("morgan")
const helmet = require("helmet")
const compression = require("compression")
const cors = require("cors")
const passport = require("./middleware/passport")

/**
 * Get router
 */
const adminRoute = require("./components/admin")
const appliedProjectRoute = require('./components/appliedProject')
const poolRoute = require("./components/project")
const userRoute = require("./components/user")
const whitelistRoute = require("./components/whitelist")
const index = require('./components/index')

/**
 * Create express app
 */
const app = express()

/**
 * Config package
 */
app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(helmet())
app.use(cors())
app.use(compression())

/**
 * Connect to database
 */
require('./connection')

/**
 * Initialize passport
 */
 app.use(passport.initialize());
 
/**
 * Setup routing
 */

app.use("/", index)
app.use("/api/admin", adminRoute)
app.use('/api/applied', appliedProjectRoute)
app.use('/api/pool', poolRoute)
app.use('/api/user', userRoute)
app.use('/api/whitelist', whitelistRoute)

module.exports = app

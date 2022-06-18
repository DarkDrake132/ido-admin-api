const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const { login, getAdmin } = require("../components/admin/controller")
const JwtStrategy = require("passport-jwt").Strategy
const ExtractJwt = require("passport-jwt").ExtractJwt
require('dotenv').config();

passport.use(
    new LocalStrategy(
        { session: false, passReqToCallback: true },
        async function (req, username, password, done) {
            try {
                const user = await login(username, password)
                return done(null, user)
            } catch (error) {
                return done({ error })
            }
        }
    )
)

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = process.env.JWT_SECRET

passport.use(
    new JwtStrategy(opts, async function (jwt_payload, done) {
        try {
            const user = await getAdmin(jwt_payload.Username)
            return done(null, user)
        } catch (error) {
            return done({ error })
        }
    })
)

module.exports = passport

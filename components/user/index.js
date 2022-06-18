const express = require("express")
const passport = require("../../middleware/passport")
const {
    getUsersPagination,
    countUsers,
    createUsers,
    getEmail,
    getAddress,
} = require("./controller")
const { authorizeAdmin } = require("../../middleware/authorize")
const { sendConfirmKYCEmail } = require("../../middleware/sendgrid")

const router = new express.Router()

router.use(passport.authenticate("jwt", { session: false }))
router.use(authorizeAdmin)
/**
 * Params page, limit
 */
router.get("/", function (req, res) {
    passport.authenticate("jwt", async function (err, user) {
        if (err) {
            return res.status(401).json(err)
        }
        try {
            let page = req.query.page
            let limit = req.query.limit

            if (Object.keys(req.query).length === 0) {
                //api/pool/
                page = 0
                limit = 5
            }

            const userData = await getUsersPagination(page, limit)
            const userAmount = await countUsers()

            const users = {
                PageAmount: Math.ceil(userAmount / limit),
                Users: userData,
            }

            return res.send(users)
        } catch (error) {
            return res.status(404).json(err)
        }
    })(req, res)
})

/**
 * body emails list
 */
router.post("/sendConfirmKYCEmail", function (req, res) {
    passport.authenticate("jwt", async function (err, user) {
        if (err) {
            return res.status(401).json(err)
        }
        try {
            const results = await sendConfirmKYCEmail(req.body.emails)

            return res.json({ results })
        } catch (error) {
            return res.status(404).json(err)
        }
    })(req, res)
})

/**
 * Body
 * {
    "Users" : [
        {
            "Address": "user1",
            "Email": "abc@gmail.com"
        },
        {
            "Address" : "user2",
            "Email" : "abc@gmail.com"
        }
    ]
  }
 */
router.post("/create", function (req, res) {
    passport.authenticate("jwt", async function (err, user) {
        if (err) {
            console.log('err',err);
            return res.status(401).json(err)
        }
        try {
            const users = await createUsers(req.body.Users)

            if (users["ValidUsers"].length === 0) {
                return res.status(404).json(users)
            }
            return res.status(200).send(users)
        } catch (error) {
            return res.status(404).json(error)
        }
    })(req, res)
})

router.post("/filter-kyc", function (req, res) {
    passport.authenticate("jwt", async function (err, user) {
        if (err) {
            return res.status(401).json(err)
        }
        try {
            const { data, address, email } = req.body
            if (address === true) {
                const result = []
                await Promise.all(
                    data.map(async (user) => {
                      const isExist = await getEmail(user)
                      if (isExist != null) {
                        result.push(user)
                      }
                    })
                )
                console.log(true);
                return res.json(result)
            }
            if (email === true) {
                const result = []
                await Promise.all(
                    data.forEach(async (user) => {
                        const isExist = await getAddress(user)
                        if (isExist != null) {
                            result.push(user)
                        }
                    })
                )
                return res.json(result)
            }
            throw "Short of data"
        } catch (error) {
            return res.status(400).json({ error })
        }
    })(req, res)
})

module.exports = router

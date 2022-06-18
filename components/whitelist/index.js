const express = require("express");
const passport = require("../../middleware/passport");
const {
  getAllValidUsers,
  getInvalidUserPagination,
  getAllUserPagination,
  countValidUsers,
  countInvalidUsers,
  countUsers,
  registerWhitelist,
  updateWhitelist,
  whitelistNotBegin,
  whitelistEnd,
  countWhitelistedUsers, 
  exportWhitelistTemplate,
  importWhitelistToPool,
  addUserToWhiteList} = require("./controller")
const Pool = require("../project/controller");
const { authorizeAdmin } = require("../../middleware/authorize");

const router = new express.Router();
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './xlsxFolder');
    },
    filename: function(req, file, cb) {
        cb(null , file.originalname )
    },
  });
  
const upload = multer({ storage: storage });

router.use(passport.authenticate('jwt', { session: false }))
router.use(authorizeAdmin);

/**
 * Params PoolAddress
 */
router.get("/", function (req, res) {

  passport.authenticate("jwt", async function (err, user) {
    if (err) {
      return res.status(401).json(err);
    }
    try {
      let poolAddress = req.query.poolAddress;
      if (await Pool.checkPoolExists(poolAddress) === 0) {
        throw "Cannot find pool";
      }

      const userAmount = await countUsers(poolAddress);
      const validUserAmount = await countValidUsers(poolAddress);
      const whitelistedUsers = await countWhitelistedUsers(poolAddress);
      const whitelistBegin = await Pool.getWhitelistBegin(poolAddress);
      const whitelistEnd = await Pool.getWhitelistBegin(poolAddress);
      
      
      const data = {
        Users: userAmount ,    //All users (valid and invalid)
        ValidUsers: validUserAmount,   //Users can be whitelisted
        WhitelistedUsers: whitelistedUsers,  //Users has whitelisted
        WhitelistBegin: whitelistBegin,
        WhitelistEnd: whitelistEnd,
      }

      return res.status(200).send(data);
    } catch (error) {
      return res.status(404).json(error);
    }
  })(req, res);
});

/**
 * Params poolAddress, page, limit
 */
router.get("/validUsers", function (req, res) {
  passport.authenticate("jwt", async function (err, user) {
    if (err) {
      return res.status(401).json(err);
    }
    try {

      let poolAddress = req.query.poolAddress;

      if (await Pool.checkPoolExists(poolAddress) === 0) {
        throw "Cannot find pool";
      }
    
      const validUserData = await getAllValidUsers(poolAddress);
      const validUserAmount = await countValidUsers(poolAddress);

      const whitelist = {
        Amount: validUserAmount,
        Whitelist: validUserData
      }

      return res.status(200).send(whitelist);
    } catch (error) {
      return res.status(404).json(error);
    }
  })(req, res);
});

router.get("/invalidUsers", function (req, res) {
  passport.authenticate("jwt", async function (err, user) {
    if (err) {
      return res.status(401).json(err);
    }
    try {

      let poolAddress = req.query.poolAddress;
      let page = req.query.page;
      let limit = req.query.limit;

      if (await Pool.checkPoolExists(poolAddress) === 0) {
        throw "Cannot find pool";
      }

      if (page == undefined && limit == undefined) {
        page = 0;
        limit = 5;
      }
    
      const invalidUserData = await getInvalidUserPagination(poolAddress, page, limit);
      const invalidUserAmount = await countInvalidUsers(poolAddress);

      const invalidUsers = {
        PageAmount: Math.ceil(invalidUserAmount / limit),
        InvalidUsers: invalidUserData
      }

      return res.status(200).send(invalidUsers);
    } catch (error) {
      return res.status(404).json(error);
    }
  })(req, res);
});

router.get("/allUsers", function (req, res) {
  passport.authenticate("jwt", async function (err, user) {
    if (err) {
      return res.status(401).json(err);
    }
    try {

      let poolAddress = req.query.poolAddress;
      let page = req.query.page;
      let limit = req.query.limit;

      if (await Pool.checkPoolExists(poolAddress) === 0) {
        throw "Cannot find pool";
      }

      if (page == undefined && limit == undefined) {
        page = 0;
        limit = 5;
      }
    
      const userData = await getAllUserPagination(poolAddress, page, limit);
      const userAmount = await countUsers(poolAddress);

      const users = {
        PageAmount: Math.ceil(userAmount / limit),
        Users: userData
      }

      return res.status(200).send(users);
    } catch (error) {
      return res.status(404).json(error);
    }
  })(req, res);
});

/**
 * Body poolAdress, userAddress
 * {
 *  "PoolAddress" : "0xA8d58f7093efF90552080e502D5bAe642B445E97",
    "UserAddress" : "0x6190Df18903E5cdb24D72736A34da8775241f343"
 * }
 */
router.post("/register", function (req, res) {

  passport.authenticate("jwt", async function (err, user) {
    if (err) {
      return res.status(401).json(err);
    }
    try {
      if (await Pool.checkPoolExists(req.body.PoolAddress) === 0) {
        throw "Cannot find pool";
      }

      //let now = Math.floor(Date.now() / 1000);

      // if (await whitelistNotBegin(now, req.body.PoolAddress) === true) {
      //   throw "The whitelist time has not started yet!";
      // }

      // if (await whitelistEnd(now, req.body.PoolAddress) === true) {
      //   throw "The whitelist time has ended!";
      // }

      await registerWhitelist(req.body);
      return res.status(200).json({ message: "succeed" });
    } catch (error) {
      return res.status(404).json(error);
    }
  })(req, res);
});

/**
 * Body
 *{ 
 * "PoolAddress" : "0x9d24bc0C8284696211A469d4C3779d930C5ae851",
    "Whitelist" : [
        {
            "UserAddress": "0x54A882e8FF2d4e8aE8EE993AB171758205641058",
            "MaxAmount" : 100
        },
        {
            "UserAddress": "0x4596A73E51a41d04D3079A19fD263CBAFcB3a582",
            "MaxAmount" : 100000
        }
    ]
  }
 */
router.post("/setWhitelist", function (req, res) {

  passport.authenticate("jwt", async function (err, user) {
    if (err) {
      return res.status(401).json(err);
    }
    try {
      if (await Pool.checkPoolExists(req.body.PoolAddress) === 0) {
        throw "Cannot find pool";
      }

      // let now = Math.floor(Date.now() / 1000);

      // if (await whitelistNotBegin(now, req.body.PoolAddress) === true) {
      //   throw "The whitelist time has not started yet!";
      // }

      // if (await whitelistEnd(now, req.body.PoolAddress) === true) {
      //   throw "The whitelist time has ended!";
      // }

      await updateWhitelist(req.body.PoolAddress, req.body.Whitelist)

      return res.status(200).json({ message: "succeed" });
    } catch (error) {
      console.log(error);
      return res.status(404).json(error);
    }
  })(req, res);
});

/**
 * Param poolAddress
 * name whitelist
 */
 router.post("/importWhitelist/:PoolAddress", upload.single('whitelist'), async function (req, res) {
  try {
    await importWhitelistToPool(req.params.PoolAddress, req.file);
    
    return res.status(200).json({message: 'succeed'});
  } catch (error) {
    return res.status(404).json(error);
  }
});

/**
 * Param none
 */
 router.get("/exportWhitelistTemplate", async function (req, res) {
  try {
    const path = await exportWhitelistTemplate();
    return res.download(path);
  } catch (error) {
    return res.status(404).json(error);
  }
});

/**
 * Params PoolAddress
 * Body Users
 */
router.post("/addUsersToWhiteList/:PoolAddress", async function (req, res) {
  try {
    await addUserToWhiteList(req.params.PoolAddress, req.body.Users);

    return res.status(200).json({message: 'succeed'});
  } catch (error) {
    return res.status(404).json(error);
  }
});


module.exports = router;
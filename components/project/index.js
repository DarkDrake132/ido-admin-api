const express = require("express");
const { authorizeAdmin } = require("../../middleware/authorize");
const passport = require("../../middleware/passport");
const {
  getPools,
  getPoolById,
  getPoolsPagination,
  countPools,
  createPool,
  percentagePoolsInSomeDays,
} = require("./controller");
const router = new express.Router();

router.use(passport.authenticate("jwt", { session: false }));

router.post("/percentagePoolsInSomeDays", async function (req, res) {
  try {
    const count = await percentagePoolsInSomeDays(req.body.days)
    return res.status(200).json({ pools: count });
  } catch (err) {
    return res.status(400).json(err);
  }
});

router.use(authorizeAdmin);
/**
 * Params none
 */
router.get("/all", function (req, res) {
  passport.authenticate("jwt", async function (err, user) {
    if (err) {
      return res.status(401).json(err);
    }
    try {
      const poolData = await getPools();

      const pools = poolData.map((pool) => {
        return {
          Id: pool.Name.toLowerCase().replace(" ", "-"),
          ...pool["dataValues"],
        };
      });

      return res.json(pools);
    } catch (error) {
      return res.status(404).json(error);
    }
  })(req, res);
});

/**
 * Params page, limit
 */
router.get("/", function (req, res) {
  passport.authenticate("jwt", async function (err, user) {
    if (err) {
      return res.status(401).json(err);
    }
    try {
      let page = req.query.page;
      let limit = req.query.limit;
      if (Object.keys(req.query).length === 0) {
        //api/pool/
        page = 0;
        limit = 5;
      }

      const poolData = await getPoolsPagination(page, limit);
      const poolAmount = await countPools();

      const Pools = poolData.map((pool) => {
        const poolName = pool.Name.toLowerCase();
        return {
          Id: poolName.replace(new RegExp(" ", "g"), "-"),
          ...pool["dataValues"],
        };
      });

      const pools = {
        PageAmount: Math.ceil(poolAmount / limit),
        Pools: Pools,
      };

      return res.send(pools);
    } catch (error) {
      return res.status(404).json(error);
    }
  })(req, res);
});

router.post("/create", function (req, res) {
  passport.authenticate("jwt", async function (err, user) {
    if (err) {
      return res.status(401).json(err);
    }
    try {
      const pool = {
        PoolAddress: req.body.PoolAddress,
        Name: req.body.ProjectName,
        Description: req.body.Description,
        Website: req.body.Website,
        Whitepaper: req.body.Whitepaper,
        Twitter: req.body.Twitter,
        Telegram: req.body.Telegram,
        Github: req.body.Github,
        Medium: req.body.Medium,
        StakeAddress: req.body.StakeAddress,
        TokenAddress: req.body.TokenAddress,
        OwnerAddress: req.body.OwnerAddress,
        SignerAddress: req.body.SignerAddress,
        LogoUrl: req.body.LogoUrl,
        BeginTime: req.body.BeginTime,
        EndTime: req.body.EndTime,
        MoneyRaise: req.body.MoneyRaise,
        ChainId: req.body.ChainId,
        WhitelistBegin: req.body.WhitelistBegin,
        WhitelistEnd: req.body.WhitelistEnd,
        WhitelistLink: req.body.WhitelistLink,
      };
      console.log(pool);
      await createPool(pool, req.body.AppliedProjectId);

      return res.status(200).json({ message: "succeed" });
    } catch (err) {
      return res.status(400).json(err);
    }
  })(req, res);
});

router.get("/countPools", async function (req, res) {
  try {
    const count = await countPools();

    return res.status(200).json({ countPool: count });
  } catch (err) {
    return res.status(400).json(err);
  }
});

/**
 * Params pool id
 */
 router.get("/:id", function (req, res) {
  const Id = req.params.id;
  passport.authenticate("jwt", async function (err, user) {
    if (err) {
      return res.status(401).json(err);
    }
    try {
      const pool = await getPoolById(Id);
      const poolName = pool.Name.toLowerCase();
      pool["Id"] = poolName.replace(new RegExp(" ", "g"), "-");
      return res.status(200).json(pool);
    } catch (err) {
      return res.status(400).json(err);
    }
  })(req, res);
});

module.exports = router;

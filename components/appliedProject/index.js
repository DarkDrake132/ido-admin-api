const express = require("express");
const { authorizeAdmin } = require("../../middleware/authorize");
const passport = require("../../middleware/passport");
const {
  getAppliedProject,
  updateAppliedProject,
  getAppliedProjectById,
  deleteAppliedProject,
  exportAppliedProjectAsXlsx,
  createAppliedProject,
  getAppliedProjectPagination,
  countProjects,
  percentageProjectsInSomeDays
} = require("./controller");
const developmentState = require("./development-state")
const status = require("./status-types")
const router = new express.Router();

router.use(passport.authenticate('jwt', { session: false }));

router.post("/percentageAppliedProjectsInSomeDays", async function (req, res) {
  try {
    const count = await percentageProjectsInSomeDays(req.body.days);
    
    return res.status(200).json({ projects: count });
  } catch (err) {
    return res.status(400).json(err);
  }
});
router.use(authorizeAdmin);

/**
 * Params none
 */
router.get("/all", async function (req, res) {
    try {
      const projects = await getAppliedProject();
      return res.json(projects);
    } catch (error) {
      return res.status(404).json(error);
    }
});

/**
 * Params none
 */
router.get("/", function (req, res) {
  passport.authenticate("jwt", async function (err, user) {
    
    
    if (err) {
      return res.status(401).json(err);
    }
    try {
      let page = req.query.page;
      let limit = req.query.limit;
      if (Object.keys(req.query).length === 0)  //api/applied/
      {
        page = 0;
        limit = 5;
      }

      const projectAmount = await countProjects(); 
      const projectData = await getAppliedProjectPagination(page,limit);

      const projects = {
        PageAmount : Math.ceil(projectAmount / limit),
        Projects: projectData
      }

      return res.send(projects);
    } catch (error) {
      return res.status(404).json(error);
    }
  })(req, res);
});

/**
 * Params none
 */
router.get("/export", function (req, res) {
  passport.authenticate("jwt", async function (err, user) {
    if (err) {
      return res.status(401).json(err);
    }

    try {
      const path = await exportAppliedProjectAsXlsx();

      return res.download(path)
    } catch (err) {
      return res.status(400).json(err);
    }
  })(req, res);
})

/**
 * Params none
 */
 router.get("/status", function (req, res) {
  passport.authenticate("jwt", async function (err, user) {
    if (err) {
      return res.status(401).json(err);
    }
    try {
      return res.json(status);
    } catch (error) {
      return res.status(404).json(error);
    }
  })(req, res);
});

/**
 * Params none
 */
 router.get("/development-state", function (req, res) {
  passport.authenticate("jwt", async function (err, user) {
    if (err) {
      return res.status(401).json(err);
    }
    try {
      return res.json(developmentState);
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
      await createAppliedProject(req.body);
      return res.status(200).json({ message: "successed" });
    } catch (err) {
      return res.status(400).json(err);
    }
  })(req, res);
});

router.get("/countApplyProjects", async function (req, res) {
  try {
    const count = await countProjects();

    return res.status(200).json({ countPool: count });
  } catch (err) {
    return res.status(400).json(err);
  }
});

/**
 * Params project id
 * Body none
 */
router.get("/:id", function (req, res) {
  const Id = req.params.id;
  passport.authenticate("jwt", async function (err, user) {
    if (err) {
      return res.status(401).json(err);
    }
    try {
      const projects = await getAppliedProjectById(Id);
      return res.status(200).json(projects);
    } catch (err) {
      return res.status(400).json(err);
    }
  })(req, res);
});

/**
 * Params project ID
 * Body project information like model
 */
router.patch("/:id/update", function (req, res) {
  passport.authenticate("jwt", async function (err, user) {
    if (err) {
      return res.status(401).json(err);
    }

    if (req.params.id != req.body.Id) {
      return res.status(400).json({ message: 'Id does not match' });
    }

    try {
      
      await updateAppliedProject(req.body);
      return res.status(200).json({ message: "successed" });
    } catch (err) {
      return res.status(400).json(err);
    }
  })(req, res);
});

/**
 * Params project id
 */
router.delete("/:id/delete", function (req, res) {
  passport.authenticate("jwt", async function (err, user) {
    if (err) {
      return res.status(401).json(err);
    }
    try {
      await deleteAppliedProject(req.params.id);
      return res.status(200).json({ message: "successed" });
    } catch (err) {
      return res.status(400).json(err);
    }
  })(req, res);
});

module.exports = router;


const express = require("express");
const passport = require("../../middleware/passport");
const jwt = require("jsonwebtoken");
const {
  createAdmin,
  banAdmin,
  unbanAdmin,
  resetPassword,
  changePassword,
  updateAdmin,
  getAdminList,
  countAdmins,
  getAdmin,
} = require("./controller");

const router = new express.Router();

router.post("/login", function (req, res) {
  passport.authenticate("local", function (err, user) {
    console.log(2);
    if (err) {
      return res.status(401).json(err);
    }
    return res.json({
      user: user,
      token:
        "Bearer " +
        jwt.sign(user, process.env.JWT_SECRET, {
          expiresIn: "8h",
        }),
    });
  })(req, res);
});

router.patch("/changePassword", async function (req, res) {
  try {
    await changePassword({
      username: req.body.username,
      oldPassword: req.body.oldPassword,
      confirmPassword: req.body.confirmPassword,
      newPassword: req.body.newPassword,
    });
    return res.status(200).json({ message: "succeed" });
  } catch (err) {
    return res.status(400).json(err);
  }
});

router.get("/admins/:username", async function (req, res) {
  try {
    const admin = await getAdmin(req.params.username);
    delete admin.Password;
    return res.status(200).json(admin);
  } catch (err) {
    return res.status(400).json(err);
  }
});

router.post("/createAdmin", async function (req, res) {
  try {
    const admin = await createAdmin({
      username: req.body.username,
      password: req.body.password,
      name: req.body.name,
    });
    return res.status(200).json({ message: "succeed" });
  } catch (err) {
    return res.status(400).json(err);
  }
});

router.delete("/banAdmin", async function (req, res) {
  try {
    await banAdmin({ username: req.body.username });
    return res.status(200).json({ message: "succeed" });
  } catch (err) {
    return res.status(400).json(err);
  }
});

router.patch("/unbanAdmin", async function (req, res) {
  try {
    await unbanAdmin({ username: req.body.username });
    return res.status(200).json({ message: "succeed" });
  } catch (err) {
    return res.status(400).json(err);
  }
});

router.patch("/resetPassword", async function (req, res) {
  try {
    const newPassword = await resetPassword({
      username: req.body.username,
      superAdminPassword: req.body.superAdminPassword,
    });
    return res.status(200).json({
      newPassword: newPassword,
      message: "Please change new password",
    });
  } catch (err) {
    return res.status(400).json(err);
  }
});

router.patch("/updateAdmin", async function (req, res) {
  try {
    await updateAdmin({ username: req.body.username, name: req.body.name });
    return res.status(200).json({ message: "succeed" });
  } catch (err) {
    return res.status(400).json(err);
  }
});

router.get("/getAdminList", async function (req, res) {
  try {
    let page, limit;
    if (Object.keys(req.query).length === 0) {
      //api/pool/
      page = 0;
      limit = 5;
    } else {
      page = req.query.page;
      limit = req.query.limit;
    }
    const adminList = await getAdminList({ page: page, limit: limit });
    const sumOfAdmin = await countAdmins();
    const admins = {
      PageAmount: Math.ceil(sumOfAdmin / limit),
      Admins: adminList,
    };

    return res.status(200).json(admins);
  } catch (err) {
    return res.status(400).json(err);
  }
});

module.exports = router;

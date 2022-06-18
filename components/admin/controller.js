const bcrypt = require("bcrypt");
const Admin = require("./model");
const { Op } = require("sequelize");
const saltRounds = 10;

const login = async (username, password) => {
  const user = await Admin.findOne({
    where: { Username: username },
    raw: true,
  });
  if (!user) {
    throw "Username not exist";
  }
  if (user.IsDeleted == 1) {
    throw "Account was deleted!";
  }
  const checkPass = bcrypt.compareSync(password, user.Password);
  if (!checkPass) {
    throw "Password wrong";
  }
  delete user.Password;
  delete user.IsDeleted;
  return user;
};

const getAdmin = async (username) => {
  const admin = await Admin.findByPk(username, { raw: true });
  if (!admin) {
    throw "Something went wrong";
  }
  return admin;
};

const createAdmin = async ({ username, password, name }) => {
  const admin = await Admin.findByPk(username, { raw: true });
  if (admin) {
    throw "This username is exist, please try other username!";
  }

  try {
    const hashPassword = bcrypt.hashSync(password, saltRounds);
    const newAdmin = {
      Username: username,
      Password: hashPassword,
      Name: name,
    };
    Admin.create(newAdmin);
    return newAdmin;
  } catch (err) {
    throw err;
  }
};

const updateAdmin = async ({ username, name }) => {
  const admin = await Admin.findByPk(username, { raw: true });
  if (!admin) {
    throw "Admin is not exist";
  }
  try {
    await Admin.update({ Name: name }, { where: { Username: username } });
    return true;
  } catch (err) {
    throw err;
  }
};

const changePassword = async ({
  username,
  oldPassword,
  confirmPassword,
  newPassword,
}) => {
  if (oldPassword == undefined) {
    throw "Old password is still blank";
  } else if (confirmPassword == undefined) {
    throw "Confirm old password is still blank";
  } else if (newPassword == undefined) {
    throw "New password is still blank";
  }

  const admin = await Admin.findByPk(username, { raw: true });
  if (!admin) {
    throw "Admin is not exist";
  }
  if (oldPassword !== confirmPassword) {
    throw "Confirm password doesnot match with old password!";
  }
  try {
    await Admin.update(
      { Password: bcrypt.hashSync(newPassword, saltRounds) },
      { where: { Username: username } }
    );
    return true;
  } catch (err) {
    throw err;
  }
};

const resetPassword = async ({ username, superAdminPassword }) => {
  const superAdmin = await Admin.findByPk("admin", { raw: true });
  
  const checkPass = bcrypt.compareSync(superAdminPassword, superAdmin.Password);
  
  if (!checkPass) {
    throw "Wrong password";
  }

  const admin = await Admin.findByPk(username, { raw: true });
  if (!admin) {
    throw "Admin is not exist";
  }
  try {
    const newPassword = admin.Password.substr(-6);
    await Admin.update(
      { Password: bcrypt.hashSync(newPassword, saltRounds) },
      { where: { Username: username } }
    );
    return newPassword;
  } catch (err) {
    throw err;
  }
};

const banAdmin = async ({ username }) => {
  if (username == "admin") {
    throw "Cannot ban super admin";
  }
  const admin = await Admin.findByPk(username, { raw: true });
  if (!admin) {
    throw "Admin is not exist";
  }
  try {
    await Admin.update({ IsDeleted: 1 }, { where: { Username: username } });
    return true;
  } catch (err) {
    throw err;
  }
};

const unbanAdmin = async ({ username }) => {
  const admin = await Admin.findByPk(username, { raw: true });
  if (!admin) {
    throw "Admin is not exist";
  }
  try {
    await Admin.update({ IsDeleted: 0 }, { where: { Username: username } });
    return true;
  } catch (err) {
    throw err;
  }
};

const getAdminList = async ({ page, limit }) => {
  try {
    const admins = await Admin.findAll(
      {
        attributes: ["Username", "Name", "IsDeleted"],
        where: {
          Username: {
            [Op.not]: "admin",
          },
        },
        offset: parseInt(page) * parseInt(limit),
        limit: parseInt(limit),
      }
    );
    return admins;
  } catch (error) {
    throw error;
  }
};

const countAdmins = async () => {
  try {
    const adminAmount = await Admin.count({
      where: {
        Username: {
          [Op.not]: "admin",
        },
      },
    });

    return adminAmount;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  login,
  getAdmin,
  createAdmin,
  updateAdmin,
  changePassword,
  resetPassword,
  banAdmin,
  unbanAdmin,
  getAdminList,
  countAdmins,
};

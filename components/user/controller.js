const User = require("./model");
require('dotenv').config();
let nodeDate = require('date-and-time');
const { sendConfirmKYCEmail } = require("../../middleware/sendgrid");

const getAddress = async (email) => {
  const user = await User.findOne({ where: { Email: email } })
  console.log(user);
  return user ? user.Email : null
}

const getEmail = async (address) => {
  const user = await User.findOne({ where: { Address: address } })
  return user ? user.Email : null
}

const getUsers = async () => {
  const users = await User.findAll();
  return users;
};

const getUsersPagination = async (page, limit) => {
  try {
    const users = await User.findAll({
      offset: parseInt(page) * parseInt(limit),
      limit: parseInt(limit),
    });
    return users;
  } catch (error) {
    throw error;
  }
};

const countUsers = async () => {
  try {
    const users = await User.count();
    return users;
  } catch (error) {
    throw error;
  }
};

const checkUserExist = async (userAddress) => {
    try {
        const user = await User.count({where: {Address : userAddress}});
        return user;
    } catch (error) {
        throw error;
    }
}

const createUsers = async (users) => {
    try {
        let now = nodeDate.format(new Date(), 'DD-MMMM-YYYY, hh:mm:ss');
        let validUsers = [];
        let invalidUsers = [];
        
        for (let i = 0; i < users.length; i++) {
            if (await checkUserExist(users[i]["Address"]) == 0) {
                if (users[i]["CreatedAt"] == undefined && users[i]["UpdatedAt"] == undefined) {
                    users[i]["CreatedAt"] = now;
                    users[i]["UpdatedAt"] = now;
                }
                await User.create(users[i])
                .then(async user => {
                  validUsers.push(user)
                  await sendConfirmKYCEmail(user.Email)
                })
                .catch(err => {invalidUsers.push(users[i])})
            }
            else {
                invalidUsers.push(users[i])
            }
        }

        const userResult = {
            "ValidUsers" : validUsers,
            "InvalidUsers" : invalidUsers,
        }

        return userResult;
    } catch (error) {
        throw error;
    }
}

module.exports = {
  getEmail,
  getAddress,
  getUsers,
  getUsersPagination,
  countUsers, 
  createUsers, 
  checkUserExist
};

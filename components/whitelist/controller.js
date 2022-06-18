const Whitelist = require("./model");
const PoolModel = require('../project/model')
const sequelize = require("../../connection")
let nodeDate = require('date-and-time');
const User = require("../user/controller")
const status = require("../whitelist/status-type")
const Pool = require("../project/controller");
const { writeXlsxFile, readXlsxFile } = require("../../utility/XlsxUtility");
const { sendWhitelistSuccessEmail } = require("../../middleware/sendgrid");

const getWhitelist = async () => {
    const users = await Whitelist.findAll();
    return users;
};

const getAllValidUsers = async (poolAddress) => {
    try {
        const whitelist = await Whitelist.findAll({
            attributes: ['UserAddress', 'MaxAmount'],
            where: { PoolAddress: poolAddress, Status: status.PENDING},
            raw: true
        });
        console.log(whitelist);
        for (let i = 0; i < whitelist.length; i++) {
            const checkExist = await User.checkUserExist(whitelist[i]["UserAddress"]);
            whitelist[i]["IsKYC"] = checkExist;
        }

        const list = whitelist.filter((item) => item.IsKYC !== 0);

        return list;
    } catch (error) {
        throw error;
    }
}

const getInvalidUserPagination = async (poolAddress, page, limit) => {
    try {
        const whitelist = await Whitelist.findAll({
            attributes: ['UserAddress', 'MaxAmount'],
            where: { PoolAddress: poolAddress, Status: status.PENDING },
            offset: parseInt(page) * parseInt(limit),
            limit: parseInt(limit),
            raw: true
        });

        for (let i = 0; i < whitelist.length; i++) {
            const checkExist = await User.checkUserExist(whitelist[i]["UserAddress"]);
            whitelist[i]["IsKYC"] = checkExist;
        }

        const list = whitelist.filter((item) => item.IsKYC === 0);

        return list;
    } catch (error) {
        throw error;
    }
}

const getAllUserPagination = async (poolAddress, page, limit) => {
    try {
        const whitelist = await Whitelist.findAll({
            attributes: ['UserAddress', 'MaxAmount'],
            where: { PoolAddress: poolAddress },
            offset: parseInt(page) * parseInt(limit),
            limit: parseInt(limit),
            raw: true
        });

        for (let i = 0; i < whitelist.length; i++) {
            const checkExist = await User.checkUserExist(whitelist[i]["UserAddress"]);
            whitelist[i]["IsKYC"] = checkExist;
        }

        return whitelist;
    } catch (error) {
        throw error;
    }
}

//Count all users who used to KYC
const countValidUsers = async (poolAddress) => {
    try {
        const whitelist = await Whitelist.findAll({
            where: { PoolAddress: poolAddress },
            raw: true
        });

        for (let i = 0; i < whitelist.length; i++) {
            const checkExist = await User.checkUserExist(whitelist[i]["UserAddress"]);
            whitelist[i]["IsKYC"] = checkExist;
        }

        const list = whitelist.filter((item) => item.IsKYC !== 0);

        return list.length;
    } catch (error) {
        throw error;
    }
}

const countInvalidUsers = async (poolAddress) => {
    try {
        const whitelist = await Whitelist.findAll({
            where: { PoolAddress: poolAddress },
            raw: true
        });

        for (let i = 0; i < whitelist.length; i++) {
            const checkExist = await User.checkUserExist(whitelist[i]["UserAddress"]);
            whitelist[i]["IsKYC"] = checkExist;
        }

        const list = whitelist.filter((item) => item.IsKYC === 0);

        return list.length;
    } catch (error) {
        throw error;
    }
}

const countUsers = async (poolAddress) => {
    try {
        const users = await Whitelist.count({
            where: { PoolAddress: poolAddress },
        });

        return users;
    } catch (error) {
        throw error;
    }
}

const registerWhitelist = async (whitelist) => {
    try {
        let now = nodeDate.format(new Date(), 'DD-MMMM-YYYY, hh:mm:ss');
        if (whitelist["CreatedAt"] == undefined && whitelist["UpdatedAt"] == undefined) {
            whitelist["CreatedAt"] = now;
            whitelist["UpdatedAt"] = now;
        }
        if (whitelist["MaxAmount"] == undefined) {
            whitelist["MaxAmount"] = 0;
        }
        if (whitelist["Status"] == undefined) {
            whitelist["Status"] = status.PENDING;
        }
        await Whitelist.create(whitelist)
    } catch (error) {
        throw error;
    }
}

const updateMaxAmountAndStatus = async (poolAddress, userAddress, maxAmount, status) => {
    try {
        let now = nodeDate.format(new Date(), 'DD-MMMM-YYYY, hh:mm:ss');
        await Whitelist.update({ MaxAmount: maxAmount, Status: status, UpdatedAt: now },
            { where: { PoolAddress: poolAddress, UserAddress: userAddress } });
    } catch (error) {
        throw error;
    }
}

const updateWhitelist = async (poolAddress, whitelist) => {
    try {
        //Update DB whitelist
        for (let i = 0; i < whitelist.length; i++) {
            await updateMaxAmountAndStatus(poolAddress, whitelist[i]["UserAddress"], whitelist[i]["MaxAmount"], status.APPROVE)
        }
        const fetchWhitelist = await Promise.all(whitelist.map(async (user) => {
            return {email: await User.getEmail(user.UserAddress), address: user.UserAddress, maxAmount: user.MaxAmount}
        }))
        const project = await Pool.getPoolByAddress(poolAddress)
        await sendWhitelistSuccessEmail(fetchWhitelist, project.Name)
    } catch (error) {
        throw error;
    }
}

const whitelistNotBegin = async (time, poolAddress) => {
    const whitelistBegin = await Pool.getWhitelistBegin(poolAddress);

    if (time < whitelistBegin) {
        return true;
    }
    return false;
}

const whitelistEnd = async (time, poolAddress) => {
    const whitelistEnd = await Pool.getWhitelistEnd(poolAddress);

    if (time >= whitelistEnd) {
        return true;
    }
    return false;
}

const countWhitelistedUsers = async (poolAddress) => {
    try {
        let whitelist = await Whitelist.count({
            where: { PoolAddress: poolAddress, Status: status.APPROVE }
        });
        return whitelist;
    } catch (error) {
        throw error;
    }
}

const exportWhitelistTemplate = async () => {
    const whitelistTemplate =[
        {
            'UserAddress' : null
        }
    ]
    const path = writeXlsxFile('whitelistTemplate', whitelistTemplate);
    return path;
}

const importWhitelistToPool = async (poolAddress, file) => {
    const pool = await PoolModel.findByPk(poolAddress);

    if(!pool){
        throw 'Pool is not exist';
    }

    try{
        const whitelist = readXlsxFile(file.filename);
        const users = [];
        for(let i = 0; i < whitelist.length; i++){
            users.push(whitelist[i].UserAddress);
        }
        addUserToWhiteList(poolAddress, users)
    }
    catch(e){
        throw err
    }
}

const addUserToWhiteList = async (poolAddress, users) => {
    const pool = await PoolModel.findByPk(poolAddress);
    if(!pool){
        throw 'Pool is not exist';
    }
    try{
        const now = nodeDate.format(new Date(), 'DD-MMMM-YYYY, hh:mm:ss');
        users.forEach( async (user) => {
            console.log(user);
            await Whitelist.create({
                'PoolAddress': poolAddress,
                'UserAddress': user,
                'MaxAmount': 0,
                'Status': status.PENDING,
                'CreatedAt': now,
                'UpdatedAt': now,
            });
            
        });
    }
    catch(err){
        throw err;
    }
}

module.exports = {
    getWhitelist,
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
    addUserToWhiteList,
};

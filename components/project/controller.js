
const Project = require("./model");
const sequelize = require("../../connection")
let nodeDate = require('date-and-time');
const status = require("../appliedProject/status-types");
const appliedProject = require("../appliedProject/controller");
const { Op } = require("sequelize");

const getPools = async () => {
  const pools = await Project.findAll();
  return pools;
};

const getPoolsPagination = async (page, limit) => {
  try {
    const pools = await Project.findAll({
      offset: parseInt(page) * parseInt(limit),
      limit: parseInt(limit)
    });
    return pools;
  } catch (error) {
    throw error;
  }
}

const getPoolById = async (poolId) => {

  const pool = await sequelize.query(
    `SELECT * FROM project WHERE LOWER(REPLACE(Name, ' ', '-')) = '${poolId}'`
  );

  if (!pool[0][0]) {
    throw "Cannot find pool";
  }

  return pool[0][0];
};

const getPoolByAddress = async (address) => {

  const pool = await Project.findByPk(address)

  if (!pool) {
    throw "Cannot find pool";
  }

  return pool;
};

const countPools = async () => {
  try {
    const pools = await Project.count();
    return pools;
  } catch (error) {
    throw error;
  }
}

const createPool = async (pool, appliedProjectId) => {
  try {

    if (pool["CreatedAt"] == undefined && pool["UpdatedAt"] == undefined) {
      let now = nodeDate.format(new Date(), 'DD-MMMM-YYYY, hh:mm:ss');
      pool["CreatedAt"] = now;
      pool["UpdatedAt"] = now;
    }

    await Project.create(pool)
    await appliedProject.updateStatus(appliedProjectId, status.APPROVE);

  } catch (error) {
    throw error
  }
};

const checkPoolExists = async (poolAddress) => {
  const pool = await Project.count({ where: { PoolAddress: poolAddress } });
  return pool;
};

const getWhitelistBegin = async (poolAddress) => {
  const whitelistBegin = await Project.findOne({
      attributes: ['WhitelistBegin'],  
      where: { PoolAddress: poolAddress },
      raw: true
    });

  return whitelistBegin.WhitelistBegin;
}

const getWhitelistEnd = async (poolAddress) => {
  const whitelistEnd = await Project.findOne({
    attributes: ['WhitelistEnd'],  
    where: { PoolAddress: poolAddress },
    raw: true
  });

  return whitelistEnd.WhitelistEnd;
};

const getChainId = async (poolAddress) => {
  const pool = await Project.findOne({
    attributes: ['ChainId'],  
    where: { PoolAddress: poolAddress },
    raw: true
  });

  return pool.ChainId;
};

const percentagePoolsInSomeDays = async (numberOfDay) => {
  const current = nodeDate.format(new Date(), 'DD-MMMM-YYYY, hh:mm:ss');
  var date = new Date();
  date.setDate(date.getDate() - numberOfDay);
  const prior = nodeDate.format(date, 'DD-MMMM-YYYY, hh:mm:ss'); 

  const numberOfPools = await Project.count({
    where:{
      CreatedAt:{
        [Op.gte]: prior,
        [Op.lte]: current
      }
    }
  })

  const total = await countPools();

  return {
    total,
    numberOfPools,
    percent: `${(numberOfPools / total * 100).toFixed(2)}%`,
    current,
    prior
  };
}

module.exports = {
  getPools, 
  getPoolById, 
  getPoolByAddress,
  getPoolsPagination, 
  countPools, 
  createPool, 
  checkPoolExists, 
  getWhitelistBegin, 
  getWhitelistEnd,
  getChainId,
  percentagePoolsInSomeDays
};

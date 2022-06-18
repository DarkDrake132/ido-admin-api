const AppliedProject = require("./model");
const XLSX = require("xlsx");
const chainIdToNetwork = require("../../utility/NetworkUtility");
let nodeDate = require("date-and-time");
const status = require("./status-types");
const { writeXlsxFile } = require("../../utility/XlsxUtility");
const { Op } = require("sequelize");

const getAppliedProject = async () => {
  const applied_projects = await AppliedProject.findAll({
    where: { isDeleted: false },
  });
  return applied_projects;
};

const getAppliedProjectPagination = async (page, limit) => {
  try {
    const applied_projects = await AppliedProject.findAll({
      where: {
        isDeleted: false,
      },
      offset: parseInt(page) * parseInt(limit),
      limit: parseInt(limit),
    });
    return applied_projects;
  } catch (error) {
    throw error;
  }
};

const countProjects = async () => {
  try {
    const applied_projects = await AppliedProject.count();
    return applied_projects;
  } catch (error) {
    throw error;
  }
};

const createAppliedProject = async (project) => {
  if (project["isDeleted"] == undefined) {
    project["isDeleted"] = false;
  }
  if (project["Status"] == undefined) {
    project["Status"] = status.NEW;
  }
  if (project["CreatedAt"] == undefined && project["UpdatedAt"] == undefined) {
    let now = nodeDate.format(new Date(), "DD-MMMM-YYYY, hh:mm:ss");
    project["CreatedAt"] = now;
    project["UpdatedAt"] = now;
  }

  try {
    await AppliedProject.create(project);
  } catch (err) {
    throw err;
  }
};

const updateAppliedProject = async (project) => {
  try {
    await getAppliedProjectById(project.Id);
    project.UpdatedAt = nodeDate.format(new Date(), "DD-MMMM-YYYY, hh:mm:ss");
    await AppliedProject.update(project, {
      where: { Id: project.Id },
    });
  } catch (err) {
    throw err;
  }
};

const getAppliedProjectById = async (projectId) => {
  const project = await AppliedProject.findOne({ where: { Id: projectId } });

  if (!project) {
    throw "Cannot find project";
  }

  if (project.isDeleted) {
    throw "Project was deleted";
  }

  return project;
};

const deleteAppliedProject = async (projectId) => {
  await getAppliedProjectById(projectId);
  await AppliedProject.update(
    { isDeleted: true },
    { where: { Id: projectId } }
  );
};

const exportAppliedProjectAsXlsx = async () => {
  let appliedProject = await AppliedProject.findAll({
    raw: true,
    where: {
      Status: "New",
    },
  });

  appliedProject.forEach((element) => {
    delete element["isDeleted"];
    element["Network"] = chainIdToNetwork.ChainIdToNetwork(element.ChainId);
  });

  const path = writeXlsxFile("appliedProjects", appliedProject);

  return path;
};

const updateStatus = async (projectId, status) => {
  await getAppliedProjectById(projectId);
  let now = nodeDate.format(new Date(), "DD-MMMM-YYYY, hh:mm:ss");
  await AppliedProject.update(
    { Status: status, UpdatedAt: now },
    { where: { Id: projectId } }
  );
};

const percentageProjectsInSomeDays = async (numberOfDay) => {
  try {
    const current = nodeDate.format(new Date(), "DD-MMMM-YYYY, hh:mm:ss");
    var date = new Date();
    date.setDate(date.getDate() - numberOfDay);
    const prior = nodeDate.format(date, "DD-MMMM-YYYY, hh:mm:ss");

    const numberOfProjects = await AppliedProject.count({
      where: {
        CreatedAt: {
          [Op.gte]: prior,
          [Op.lte]: current,
        },
      },
    });
    console.log(numberOfProjects);
    const total = await countProjects();

    return {
      total,
      numberOfProjects,
      percent: `${(numberOfProjects / total * 100).toFixed(2)}%`,
      current,
      prior,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = {
  getAppliedProject,
  updateAppliedProject,
  getAppliedProjectById,
  deleteAppliedProject,
  exportAppliedProjectAsXlsx,
  createAppliedProject,
  getAppliedProjectPagination,
  countProjects,
  updateStatus,
  percentageProjectsInSomeDays,
};

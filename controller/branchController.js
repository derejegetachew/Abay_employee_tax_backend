const db = require("../model/db");
const AppError = require("../utils/appError");
const catchasyncHandler = require("../utils/catchAsync");
const Branch = db.branches;
const Op = db.Sequelize.Op;
const log = require('node-file-logger');
// Retrieve all Tutorials from the database.
exports.findAll = catchasyncHandler(async(req, res) => {
 var data =await Branch.findAll({attributes: { exclude: ['createdAt', 'updatedAt'] } });
  res.send(data);
  log.Info(`data featch on ${process.env.running_environment} server ...`)
});

// Find a single Branch with an id
exports.findOne = catchasyncHandler(async(req, res,next) => {
  const id = req.params.id;
  const data = await Branch.findByPk(id, {
    attributes: { exclude: ['createdAt', 'updatedAt'] }
  });
  if (!data) {
     log.Info(`Cannot find Branch with id=${id}.`);
     throw new AppError(`Cannot find Branch with id=${id}.`, 404);
  }
  res.send(data);
});






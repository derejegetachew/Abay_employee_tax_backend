const db = require("../model/db");
const AppError = require("../utils/appError");
const catchasyncHandler = require("../utils/catchAsync");
const people = db.people;
const user = db.users;
const employee=db.employees;
const employeeDetail=db.employee_details;
const Op = db.Sequelize.Op;
const log = require('node-file-logger');
// Retrieve all Tutorials from the database.
exports.findAll = catchasyncHandler(async (req, res) => {

  var data = await user.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    include: [
      {
        model: people,
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      },
      {
        model: employee,
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        include: [
          {
            model: employeeDetail,
            attributes: { exclude: ['createdAt', 'updatedAt'] },
          },
        ],
      },
    ],
  });
  res.send(data);
  log.Info(`Data fetched on ${process.env.running_environment} server ...`);
});

exports.findEmployeeBybranch = catchasyncHandler(async (req, res) => {
  var branch=req.body.branch|| 115;
  var data = await employeeDetail.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    attributes: { exclude: ['createdAt', 'updatedAt'] },
        where: {
        end_date: '0000-00-00' , 
        branch_id:branch},
    include: [
          {
            model: employee,
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: [
              {
              model: user,
              attributes: { exclude: ['createdAt', 'updatedAt'] },
              include:[{
                model: people,
                attributes: { exclude: ['createdAt', 'updatedAt'] },
              }
            ]
          }
            ]
          }
    ],
  });
  res.send(data);
  log.Info(`Data fetched on ${process.env.running_environment} server ...`);
});

// Find a single Branch with an id
exports.findOne = catchasyncHandler(async(req, res,next) => {
  const id = req.params.id;
  const data = await people.findByPk(id, {
    attributes: { exclude: ['createdAt', 'updatedAt'] }
  });
  if (!data) {
     log.Info(`Cannot find pepole with id=${id}.`);
     throw new AppError(`Cannot find pepole with userid=${id}.`, 404);
  }
  res.send(data);
});

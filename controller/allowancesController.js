const db = require("../model/db");
const AppError = require("../utils/appError");
const catchasyncHandler = require("../utils/catchAsync");
const emp_allowances = db.emp_allowances;
const grade = db.grades;
const log = require('node-file-logger');

// Retrieve all emp_allowances from the database.
exports.findAll = catchasyncHandler(async(req, res) => {
 var data =await emp_allowances.findAll({
    include: [
        {
          model: grade,
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        }]
 });
  res.send(data);
  log.Info(`data featch on ${process.env.running_environment} server ...`)
});

// Find a allowance by grade
exports.findallowanceByGrade = catchasyncHandler(async(req, res,next) => {
  const grade = req.body.grade;
  const data = await emp_allowances.findAll({where: {grade_id:grade,status:true},
    attributes: { exclude: ['createdAt', 'updatedAt'] } })
  if (!data) {
     log.Info(`Cannot find emp_allowances with id=${id}.`);
     throw new AppError(`Cannot find emp_allowances with id=${id}.`, 404);
  }
  res.send(data);
});


//Create and Save a new allowance 
exports.create = catchasyncHandler(async(req, res) => {
    const newAllowance = {
      transport: req.body.transport,
      house: req.body.house,
      from: req.body.from,
      grade_id: req.body.grade_id,
      status: req.body.status || false,
    };
  
    // Save emp_allowances in the database
    const data = await emp_allowances.create(newAllowance);
    res.send(data);
  }
  );


// grade model functions

// Retrieve all emp_allowances from the database.
exports.listAllGrades = catchasyncHandler(async(req, res) => {
  var data =await grade.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
         });
   res.send(data);
   log.Info(`data featch on ${process.env.running_environment} server ...`)
 });

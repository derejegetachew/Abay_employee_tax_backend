const db = require("../model/db");
const AppError = require("../utils/appError");
const catchasyncHandler = require("../utils/catchAsync");
const { calculateTax, calculateTotalIncome } = require("../utils/calculat-Tax");
const people = db.people;
const Branch = db.branches
const user = db.users;
const employee=db.employees;
const employeeDetail=db.employee_details;
const tax=db.tax_monthly;
const Op = db.Sequelize.Op;
const log = require('node-file-logger');
const employeeService=require('../service/employee-service');
const TaxService=require('../service/taxservice');
// Retrieve all Tutorials from the database.
const empai=new employeeService();
const taxapi=new TaxService();
exports.employeedetails=catchasyncHandler(async (req, res) =>{
  const { branch, month, year } = req.query;
  const employeeDetails = await empai.findEmployeeByBranch(
    branch,
    month,
    year
  );
  res.send(employeeDetails);
})
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
  var {branch}=req.query || 115;
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
exports.specificEmployee =catchasyncHandler(async (req, res, next) => {
  const { name } = req.query;
  const data = await people.findOne({
    where: { first_name:name },
    attributes: { exclude: ['createdAt', 'updatedAt'] }
  });
  if (!data) {
    log.info(`Cannot find people with first name "${first_name}".`);
    throw new AppError(`Cannot find people with first name "${first_name}".`, 404);
  }
  res.send(data);
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

// tax-monthly 

exports.gettaxRecordPermonth = catchasyncHandler(async(req, res) => {
  const {month} = req.query;
  const data = await taxapi.getTaxInfoPermonth(month );
  res.send(data);
});

exports.gettaxRecordByBranchPermonth = catchasyncHandler(async(req, res) => {
  const {month,branch} = req.query;
  const data = await taxapi.getTaxInfoByBranchPermonth(month,branch);
  res.send(data);
});
exports.taxRecordList = catchasyncHandler(async(req, res) => {
  var data =await tax.findAll();
    res.send(data);
    log.Info(`data featch on ${process.env.running_environment} server ...`)
});
exports.getUniqueMonth = catchasyncHandler(async (req, res) => {
  const data = await tax.findAll({
    attributes: ['month'],
    group: ['month'],
  });
  res.send(data);
  log.info(`Data fetched on ${process.env.running_environment} server...`);
});

exports.getempTaxBybranch = catchasyncHandler(async (req, res) => {
  var {branch,month}=req.query;

  const whereCondition = {
    month
  };

  if (branch) {
    whereCondition.branch = branch;
  }

  var data = await tax.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    attributes: { exclude: ['createdAt', 'updatedAt'] },
        where: whereCondition
      });
  
  res.send(data);
}
);

exports.getempTaxByMonth = catchasyncHandler(async (req, res) => {
  var {month}=req.query;
  var data = await tax.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    attributes: { exclude: ['createdAt', 'updatedAt'] },
        where: {
        month:month}
      });
  res.send(data);
}
);
exports.getEmpTaxStatusByMonth = catchasyncHandler(async (req, res) => {
  var {month,status}=req.query;
  var data = await tax.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    attributes: { exclude: ['createdAt', 'updatedAt'] },
        where: {
        month:month,
        status:status}
      });
  res.send(data);
}
);
exports.getEmpTaxStatusByBranchMonth = catchasyncHandler(async (req, res) => {
  var {month,status,branch}=req.query;
  var data = await tax.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    attributes: { exclude: ['createdAt', 'updatedAt'] },
        where: {
        month:month,
        status:status,
        branch: branch}
      });
      
      const dataWithtax = data.map(employee => {
        const totalSum = calculateTotalIncome(
          employee.salary,
          employee.house,
          employee.transport,
          employee.benefit
        );
        const totalTax = calculateTax(totalSum);
        const netPay = totalSum - totalTax;

        return {
          ...employee.toJSON(),
          totalSum: totalSum,
          totalTax: totalTax,
          netPay: netPay
        };
      });
  res.send(dataWithtax);
}
);

exports.getBranchSubmitedTaxRecord=catchasyncHandler(async (req, res) =>{
  const {month} = req.query;
  const branch = await taxapi.findSubmittedBranches(month );
  res.send(branch);
})
exports.getNumberOfBranchTaxRecord=catchasyncHandler(async (req, res) => {
  const { branch, month } = req.query;
  const data = await tax.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    where: {
      month: month,
      branch: branch
    }
  });

  const dataLength = data.length || 0;
  res.send(dataLength.toString());
});


exports.TaxRecord = catchasyncHandler(async(req, res) => {
  const newemptax = {
    benefit: req.body.benefit,
    tin: req.body.tin,
    month: req.body.month,
    house: req.body.house,
    fullName: req.body.fullName,
    branch: req.body.branch,
    salary:req.body.salary,
    transport: req.body.transport,
    status:req.body.status || "Draft",
    draftby:req.body.draftby
  };
  const data = await tax.create(newemptax);
  res.send(data);
}
);

exports.BulkTaxRecord = catchasyncHandler(async (req, res) => {
  const taxRecords = req.body; 
  const newTaxRecords = taxRecords.map((record) => ({
    benefit: record.benefit,
    tin: record.tin,
    house: record.house,
    month: record.month,
    fullName: record.fullName,
    branch: record.branch,
    salary: record.salary,
    transport: record.transport,
    gas_price:record.gas_price,
    step_id:record.step_id,
    grade_id:record.grade_id,
    status: record.status || "Draft",
    draftby: record.draftby,
  }));

  const createdRecords = await tax.bulkCreate(newTaxRecords);
  res.send(createdRecords);
});


exports.updateTaxData=catchasyncHandler(async (req, res) => {
  const id = req.body.id;
  const [num] = await tax.update(req.body, { where: { id: id }, });
  if (num === 1) {
    log.Info(`Tax Record with id=${id} was updated successfully.`);
    res.send({message: "Tax Record was updated successfully.",});
  } 
  else {
    log.Info(`Cannot update Tax Record with id=${id}.`);
    throw new AppError(`Cannot update Tax Record with id=${id}.!`, 404)
  }
});


exports.updateBulkTaxData = catchasyncHandler(async (req, res) => {
  const taxRecords = req.body;
  const ids = taxRecords.map((record) => record.id);
  const statusToUpdate = req.body[0].status;
  const [num] = await tax.update({status:statusToUpdate}, { where: { id: ids } });
  if (num > 0) {
    log.Info(`${num} Tax Records were updated successfully.`);
    res.send({ message: `${num} Tax Records were updated successfully.` });
  } else {
    log.Info(`No Tax Records were updated.`);
    throw new AppError(`No Tax Records were updated.`, 404);
  }
});

//update tin number 
exports.updateUserTin = catchasyncHandler(async (req, res) => {
  const id = req.body.id;
  const { tin_number } = req.body; 
  const [num] = await user.update({ tin_number }, { where: { id: id } });
  if (num === 1) {
    log.Info(`User with id=${id} tin number was updated successfully.`);
    res.send({ message: "User tin number was updated successfully." });
  } else {
    log.Info(`Cannot update user with id=${id}.`);
    throw new AppError(`Cannot update user tin with id=${id}!`, 404);
  }
});
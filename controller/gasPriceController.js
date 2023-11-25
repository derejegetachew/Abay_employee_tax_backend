const db = require("../model/db");
const AppError = require("../utils/appError");
const catchasyncHandler = require("../utils/catchAsync");
const gas_price = db.gas_prices;
const log = require('node-file-logger');
// Retrieve all gas_price from the database.
exports.findAll = catchasyncHandler(async(req, res) => {
 var data =await gas_price.findAll();
  res.send(data);
  log.Info(`data featch on ${process.env.running_environment} server ...`)
});

// Find a gas_price by month
exports.findGasByMonth = catchasyncHandler(async(req, res,next) => {
  const current_month = req.body.month;
  const current_year = req.body.year;
  const data = await gas_price.findAll({where: {month:current_month,year:current_year,status:true},
    attributes: { exclude: ['createdAt', 'updatedAt'] } })
  if (!data) {
     log.Info(`Cannot find Gas price with id=${id}.`);
     throw new AppError(`Cannot find gas price with id=${id}.`, 404);
  }
  res.send(data);
});


// Find a single gas_price with an id
exports.findOne = catchasyncHandler(async(req, res,next) => {
  const id = req.params.id;
  const data = await gas_price.findByPk(id, {
    attributes: { exclude: ['createdAt', 'updatedAt'] }
  });
  if (!data) {
     log.Info(`Cannot find Gas price with id=${id}.`);
     throw new AppError(`Cannot find gas price with id=${id}.`, 404);
  }
  res.send(data);
});




// Create and Save a new gas price
exports.create = catchasyncHandler(async(req, res) => {
    const newPrice = {
      price: req.body.price,
      month: req.body.month,
      year: req.body.year,
      yearmonth: req.body.yearmonth,
      status: req.body.status || false,
    };
  
    // Save gas_price in the database
    const data = await gas_price.create(newPrice);
    res.send(data);
  }
  );




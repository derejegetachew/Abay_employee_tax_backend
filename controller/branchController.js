// const db = require("../model/db");
// const AppError = require("../utils/appError");
// const catchasyncHandler = require("../utils/catchAsync");
// const Branch = db.branches;
// const log = require('node-file-logger');
// // Retrieve all Tutorials from the database.
// exports.findAll = catchasyncHandler(async(req, res) => {
//  var data =await Branch.findAll({attributes: { exclude: ['createdAt', 'updatedAt'] } });
//  const filteredData = data.map(item => ({
//   id: item.id,
//   name: item.name
// }));
//  res.send(filteredData);
//   log.Info(`data featch on ${process.env.running_environment} server ...`)
// });

// // Find a single Branch with an id
// exports.findOne = catchasyncHandler(async(req, res,next) => {
//   const id = req.params.id;
//   const data = await Branch.findByPk(id, {
//     attributes: { exclude: ['createdAt', 'updatedAt'] }
//   });
//   if (!data) {
//      log.Info(`Cannot find Branch with id=${id}.`);
//      throw new AppError(`Cannot find Branch with id=${id}.`, 404);
//   }
//   res.send(data);
// });





// Import required modules
const db = require("../model/db"); // Database configuration
const AppError = require("../utils/appError"); // Custom error handling class
const catchAsyncHandler = require("../utils/catchAsync"); // Utility to catch async errors
const log = require('node-file-logger'); // Logging utility

const Branch = db.branches; // Get the Branch model from the database configuration

// Retrieve all Branches from the database.
exports.findAll = catchAsyncHandler(async (req, res) => {
    const data = await Branch.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt'] } // Exclude certain attributes
    });
    const filteredData = data.map(item => ({
        id: item.id,
        name: item.name
    }));
    res.send(filteredData); // Send filtered data to the client
    log.Info(`Data fetched on ${process.env.running_environment} server ...`); // Log successful fetch
});

// Find a single Branch with an id
exports.findOne = catchAsyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const data = await Branch.findByPk(id, {
        attributes: { exclude: ['createdAt', 'updatedAt'] } // Exclude certain attributes
    });
    if (!data) {
        log.Info(`Cannot find Branch with id=${id}.`); // Log if branch not found
        throw new AppError(`Cannot find Branch with id=${id}.`, 404); // Throw error if branch not found
    }
    res.send(data); // Send branch data to the client
});

// Select only branches where working_region = 'Addis Ababa (city)'
exports.findByRegion = catchAsyncHandler(async (req, res, next) => {
    const region = 'Addis Ababa (city)'; // The region to filter branches by
    const branches = await Branch.findAll({
        where: { working_region: region },
        
        attributes: { exclude: ['createdAt', 'updatedAt'] } ,
        order: [['name', 'ASC']]
        // Exclude certain attributes
    });

   const filteredData = branches.map(item => ({
        id: item.id,
        name: item.name
    }));
    res.send(filteredData);// Send the branches data to the client
    log.Info(`Branches in ${region} fetched successfully.`); // Log successful fetch
});






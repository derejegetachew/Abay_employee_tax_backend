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
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        order: [['name', 'ASC']]
    });

    const filteredData = branches.map(item => ({
        id: item.id,
        name: item.name,
        fc_code: item.fc_code 
    }));

    res.send(filteredData); // Send the branches data to the client

    log.Info(`Branches in ${region} fetched successfully.`); // Log successful fetch
});



// Define the API function
exports.getFcCodeByBranchId = catchAsyncHandler(async (req, res) => {
    const { branch_id } = req.query; // Extract branch_id from query parameters
  
    try {
      // Validate that branch_id is provided
      if (!branch_id) {
        return res.status(400).json({ error: 'branch_id parameter is required' });
      }
    // Fetch fc_code from the branch table using branch_id
      const branch = await Branch.findOne({
        where: { id: branch_id }, // Replace 'id' with your actual branch ID column name
        attributes: ['fc_code']
      });
  
      // Check if branchData and fc_code exist
      if (!branch || !branch.fc_code) {
        return res.status(404).json({ error: 'Branch or fc_code not found' });
      }
  
      // Send the fc_code as the response
      res.status(200).json({ fc_code: branch.fc_code });
    } catch (error) {
      console.error('Error fetching fc_code:', error);
      res.status(500).json({ error: 'An error occurred while fetching fc_code' });
    }
  });
  


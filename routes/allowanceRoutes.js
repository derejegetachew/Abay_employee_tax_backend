const allowance = require("../controller/allowancesController.js");
const validateToken=require('../utils/validateTokenHandeler.js');
var router = require("express").Router();
 
 router.get("/",allowance.findAll);
 router.get("/grade",allowance.findallowanceByGrade);
 router.get("/grade-list",allowance.listAllGrades);
  // Creating a new allowance
 router.post("/",allowance.create);
module.exports=router;

const people = require("../controller/peopleController.js");
const validateToken=require('../utils/validateTokenHandeler.js');
var router = require("express").Router();
 // Creating a new Tutorial
 router.get("/",people.findAll);
 router.get("/one/:id",people.findOne);
 router.get("/employee",people.findEmployeeBybranch);
module.exports=router;
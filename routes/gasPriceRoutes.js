const gas_price = require("../controller/gasPriceController.js");
const validateToken=require('../utils/validateTokenHandeler.js');
var router = require("express").Router();
 // Creating a new Tutorial
 router.get("/",gas_price.findAll);
 router.get("/bymonth",gas_price.findGasByMonth);
 router.get("/byid/:id",gas_price.findOne);
  // Creating a new price
  router.post("/",gas_price.create);
  router.put("/",gas_price.updatePrice);
module.exports=router;